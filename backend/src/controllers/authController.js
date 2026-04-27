// AuthController — RF-012: JWT roles Admin/Residente
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
  }
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND "isActive" = true',
      [username]
    );
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { userId: user.userId, username: user.username, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Log de acceso (RF-005 — Ley 1581/2012)
    await pool.query(
      'INSERT INTO access_log ("logId","userId",method,result,floor,"deviceId") VALUES (gen_random_uuid(),$1,$2,$3,$4,$5)',
      [user.userId, 'PASSWORD', true, 0, 'WEB']
    );

    res.json({
      token,
      user: { userId: user.userId, username: user.username, role: user.role, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const me = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { login, me };
