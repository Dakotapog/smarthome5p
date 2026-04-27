// AlertService — RF-001 (humo ≤5s), RF-002 (sismo ≤5s), RF-007 (push por piso)
const { pool } = require('../db');
const { v4: uuidv4 } = require('uuid');

const getAlerts = async (req, res) => {
  try {
    const { floor, type, resolved } = req.query;
    let query = `SELECT a.*, u.username as "resolvedByName"
                 FROM alerts a
                 LEFT JOIN users u ON a."resolvedBy" = u."userId"
                 WHERE 1=1`;
    const params = [];
    let idx = 1;

    if (floor) { query += ` AND a.floor = $${idx++}`; params.push(parseInt(floor)); }
    if (type)  { query += ` AND a.type = $${idx++}`;  params.push(type); }
    if (resolved !== undefined) {
      query += ` AND a."isResolved" = $${idx++}`;
      params.push(resolved === 'true');
    }

    // Filtrar por rol: Residente solo ve su piso
    if (req.user.role === 'Resident') {
      const aptResult = await pool.query(
        `SELECT a.floor FROM apartments a
         JOIN residents r ON a."residentId" = r."residentId"
         WHERE r."userId" = $1 LIMIT 1`, [req.user.userId]
      );
      if (aptResult.rows.length > 0) {
        query += ` AND a.floor = $${idx++}`;
        params.push(aptResult.rows[0].floor);
      }
    }

    query += ` ORDER BY a."triggeredAt" DESC LIMIT 50`;
    const result = await pool.query(query, params);
    res.json({ alerts: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener alertas' });
  }
};

const getActiveAlerts = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM alerts WHERE "isResolved" = false ORDER BY "triggeredAt" DESC`
    );
    res.json({ alerts: result.rows, count: result.rows.length });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

const resolveAlert = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE alerts SET "isResolved"=true, "resolvedAt"=NOW(), "resolvedBy"=$1
       WHERE "alertId"=$2 RETURNING *`,
      [req.user.userId, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Alerta no encontrada' });
    res.json({ alert: result.rows[0], message: 'Alerta marcada como resuelta' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al resolver alerta' });
  }
};

// Simulador de alertas para demo (RF-001 / RF-002)
const simulateAlert = async (req, res) => {
  const { type = 'SMOKE', floor = 1, level = 'CRITICAL' } = req.body;
  const alertId = uuidv4();
  const readingId = uuidv4();
  const triggerStart = Date.now();

  try {
    // Crear lectura de sensor
    const sensorType = type === 'SEISMIC' ? 'SEISMIC' : 'SMOKE';
    const value = type === 'SEISMIC' ? 0.08 : 12.5;
    const unit = type === 'SEISMIC' ? 'g' : 'PPM';

    await pool.query(
      `INSERT INTO sensor_readings ("readingId","sensorId","sensorType",floor,value,unit,"gatewayMode")
       VALUES ($1,$2,$3,$4,$5,$6,'CLOUD')`,
      [readingId, `SIM-${sensorType}-P${floor}`, sensorType, floor, value, unit]
    );

    // Crear alerta
    await pool.query(
      `INSERT INTO alerts ("alertId","readingId",type,level,floor,"triggeredAt","isResolved")
       VALUES ($1,$2,$3,$4,$5,NOW(),false)`,
      [alertId, readingId, type, level, floor]
    );

    const latencyMs = Date.now() - triggerStart;

    // Crear notificación (RF-007)
    await pool.query(
      `INSERT INTO notification_log ("notifId","alertId","userId",message,channel,"sentAt",delivered)
       VALUES (gen_random_uuid(),$1,$2,$3,'PUSH',NOW(),true)`,
      [alertId, req.user.userId,
       `ALERTA ${level}: ${type === 'SMOKE' ? 'Detección de humo' : 'Actividad sísmica'} en Piso ${floor}. Latencia: ${latencyMs}ms`]
    );

    res.json({
      message: 'Alerta simulada creada',
      alertId,
      latencyMs,
      compliantRNF001: latencyMs <= 5000,
      floor,
      type,
      level
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al simular alerta' });
  }
};

module.exports = { getAlerts, getActiveAlerts, resolveAlert, simulateAlert };
