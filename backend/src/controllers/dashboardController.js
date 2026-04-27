// DashboardController — RF-004: actualización ≤10s
const { pool } = require('../db');

const getBuilding = async (req, res) => {
  try {
    const floors = [];
    for (let f = 1; f <= 5; f++) {
      // Última lectura de humo por piso
      const smoke = await pool.query(
        `SELECT value, "gatewayMode", "timestamp" FROM sensor_readings
         WHERE "sensorType"='SMOKE' AND floor=$1
         ORDER BY "timestamp" DESC LIMIT 1`, [f]
      );
      // Última lectura sísmica
      const seismic = await pool.query(
        `SELECT value, "timestamp" FROM sensor_readings
         WHERE "sensorType"='SEISMIC' AND floor=$1
         ORDER BY "timestamp" DESC LIMIT 1`, [f]
      );
      // Última lectura PIR (luces)
      const pir = await pool.query(
        `SELECT value, "timestamp" FROM sensor_readings
         WHERE "sensorType"='PIR' AND floor=$1
         ORDER BY "timestamp" DESC LIMIT 1`, [f]
      );
      // Alertas activas en el piso
      const activeAlerts = await pool.query(
        `SELECT COUNT(*) as count FROM alerts
         WHERE floor=$1 AND "isResolved"=false`, [f]
      );
      // Apartamentos del piso
      const apts = await pool.query(
        `SELECT COUNT(*) as total,
                SUM(CASE WHEN "isOccupied" THEN 1 ELSE 0 END) as occupied
         FROM apartments WHERE floor=$1`, [f]
      );

      const smokeVal = smoke.rows[0]?.value || 0;
      const seismicVal = seismic.rows[0]?.value || 0;
      const pirVal = pir.rows[0]?.value || 0;
      const alertCount = parseInt(activeAlerts.rows[0]?.count || 0);
      const gatewayMode = smoke.rows[0]?.gatewayMode || 'CLOUD';

      // Estado general del piso
      let status = 'normal';
      if (alertCount > 0) status = 'alert';
      else if (smokeVal > 5 || seismicVal >= 0.05) status = 'warning';

      floors.push({
        floor: f,
        status,
        gatewayMode,
        sensors: {
          smoke: { value: parseFloat(smokeVal), unit: 'PPM', status: smokeVal > 5 ? 'alert' : 'normal' },
          seismic: { value: parseFloat(seismicVal), unit: 'g', status: seismicVal >= 0.05 ? 'alert' : 'normal' },
          light: { value: parseFloat(pirVal) === 1.0 ? 'ON' : 'OFF', status: 'normal' },
        },
        activeAlerts: alertCount,
        apartments: {
          total: parseInt(apts.rows[0]?.total || 2),
          occupied: parseInt(apts.rows[0]?.occupied || 0)
        },
        lastUpdate: smoke.rows[0]?.timestamp || new Date()
      });
    }

    res.json({ building: 'SmartHome 5P', floors, timestamp: new Date() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener estado del edificio' });
  }
};

const getGatewayMode = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT "gatewayMode", COUNT(*) as count FROM sensor_readings
       WHERE "timestamp" > NOW() - INTERVAL '1 hour'
       GROUP BY "gatewayMode" ORDER BY count DESC LIMIT 1`
    );
    const mode = result.rows[0]?.gatewayMode || 'CLOUD';
    res.json({ gatewayMode: mode });
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

module.exports = { getBuilding, getGatewayMode };
