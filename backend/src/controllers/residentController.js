// ResidentService — RF-008: CRUD residentes (solo Admin)
const { pool } = require('../db');

const listResidents = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, u.username, u.email, u.role,
              a.number as "apartmentNumber", a.floor
       FROM residents r
       LEFT JOIN users u ON r."userId" = u."userId"
       LEFT JOIN apartments a ON a."residentId" = r."residentId"
       ORDER BY r."registeredAt" DESC`
    );
    res.json({ residents: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener residentes' });
  }
};

const createResident = async (req, res) => {
  const { fullName, phone, documentId, email, floor } = req.body;
  if (!fullName || !documentId || !email) {
    return res.status(400).json({ error: 'fullName, documentId y email son requeridos' });
  }
  const bcrypt = require('bcryptjs');
  const { v4: uuidv4 } = require('uuid');
  try {
    // Crear usuario con rol Resident
    const userId = uuidv4();
    const residentId = uuidv4();
    const username = email;
    const passwordHash = await bcrypt.hash('Res2026!', 10);

    await pool.query(
      `INSERT INTO users ("userId",username,"passwordHash",role,email,"isActive","createdAt")
       VALUES ($1,$2,$3,'Resident',$4,true,NOW())`,
      [userId, username, passwordHash, email]
    );

    await pool.query(
      `INSERT INTO residents ("residentId","userId","fullName",phone,"documentId","registeredAt")
       VALUES ($1,$2,$3,$4,$5,NOW())`,
      [residentId, userId, fullName, phone || null, documentId]
    );

    // Asignar apartamento si se indica piso
    if (floor) {
      await pool.query(
        `UPDATE apartments SET "residentId"=$1, "isOccupied"=true
         WHERE floor=$2 AND "isOccupied"=false LIMIT 1`,
        [residentId, floor]
      );
    }

    res.status(201).json({ message: 'Residente creado', residentId, userId });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Email o documento ya registrado' });
    console.error(err);
    res.status(500).json({ error: 'Error al crear residente' });
  }
};

const updateResident = async (req, res) => {
  const { id } = req.params;
  const { fullName, phone } = req.body;
  try {
    const result = await pool.query(
      `UPDATE residents SET "fullName"=$1, phone=$2, "updatedAt"=NOW()
       WHERE "residentId"=$3 RETURNING *`,
      [fullName, phone, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Residente no encontrado' });
    res.json({ resident: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

const deleteResident = async (req, res) => {
  const { id } = req.params;
  try {
    // Liberar apartamento
    await pool.query(
      `UPDATE apartments SET "residentId"=NULL, "isOccupied"=false WHERE "residentId"=$1`, [id]
    );
    await pool.query(`DELETE FROM residents WHERE "residentId"=$1`, [id]);
    res.json({ message: 'Residente eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

const getAccessLog = async (req, res) => {
  const { id } = req.params;
  try {
    const resident = await pool.query(
      `SELECT "userId" FROM residents WHERE "residentId"=$1`, [id]
    );
    if (resident.rows.length === 0) return res.status(404).json({ error: 'Residente no encontrado' });
    const userId = resident.rows[0].userId;
    const logs = await pool.query(
      `SELECT * FROM access_log WHERE "userId"=$1 ORDER BY "timestamp" DESC LIMIT 20`, [userId]
    );
    res.json({ logs: logs.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener log' });
  }
};

module.exports = { listResidents, createResident, updateResident, deleteResident, getAccessLog };
