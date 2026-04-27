// WaterMonitor — RF-011: Consumo hídrico (Ley 373/1997)
const { pool } = require('../db');

const getWaterByFloor = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON (floor) floor, "flowLpm", "cumulativeLiters",
              "measuredAt", "anomalyDetected", "sensorId"
       FROM water_consumption
       ORDER BY floor, "measuredAt" DESC`
    );
    res.json({ floors: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener consumo hídrico' });
  }
};

const getWaterHistory = async (req, res) => {
  const { floor } = req.query;
  try {
    let query = `SELECT floor, "flowLpm", "cumulativeLiters", "measuredAt", "anomalyDetected"
                 FROM water_consumption`;
    const params = [];
    if (floor) { query += ' WHERE floor=$1'; params.push(parseInt(floor)); }
    query += ' ORDER BY "measuredAt" DESC LIMIT 30';
    const result = await pool.query(query, params);
    res.json({ history: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

module.exports = { getWaterByFloor, getWaterHistory };
