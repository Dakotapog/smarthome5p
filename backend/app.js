require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { pool } = require('./src/db');

const app = express();

// CORS — permite frontend en Vercel/Render y localhost
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:4173',
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS no permitido'));
  },
  credentials: true,
}));

app.use(express.json());

// Health check (para Render y monitoreo)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'SmartHome 5P',
    version: '1.0.0',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Rutas
app.use('/api/auth',      require('./src/routes/auth'));
app.use('/api/dashboard', require('./src/routes/dashboard'));
app.use('/api/alerts',    require('./src/routes/alerts'));
app.use('/api/residents', require('./src/routes/residents'));
app.use('/api/water',     require('./src/routes/water'));

// 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

async function initDB() {
  try {
    const client = await pool.connect();
    // Verificar si las tablas ya existen
    const check = await client.query(
      `SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public' AND table_name='users'`
    );
    if (parseInt(check.rows[0].count) === 0) {
      console.log('Inicializando base de datos...');
      const schema = fs.readFileSync(path.join(__dirname, 'src/db/schema.sql'), 'utf8');
      await client.query(schema);
      const seed = fs.readFileSync(path.join(__dirname, 'src/db/seed.sql'), 'utf8');
      await client.query(seed);
      console.log('Base de datos inicializada con datos demo.');
    } else {
      console.log('Base de datos ya inicializada.');
    }
    client.release();
  } catch (err) {
    console.error('Error inicializando BD:', err.message);
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`SmartHome 5P API corriendo en puerto ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  await initDB();
});
