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
  let client;
  try {
    console.log('Conectando a PostgreSQL...');
    console.log('DATABASE_URL definida:', !!process.env.DATABASE_URL);
    client = await pool.connect();
    console.log('Conexión exitosa a PostgreSQL.');

    const check = await client.query(
      `SELECT COUNT(*) FROM information_schema.tables
       WHERE table_schema='public' AND table_name='users'`
    );
    if (parseInt(check.rows[0].count) === 0) {
      console.log('Tablas no encontradas. Ejecutando schema.sql...');
      const schemaPath = path.join(__dirname, 'src/db/schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      // Ejecutar cada sentencia por separado para mejor manejo de errores
      const statements = schema.split(';').map(s => s.trim()).filter(s => s.length > 0);
      for (const stmt of statements) {
        await client.query(stmt);
      }
      console.log('Schema creado. Ejecutando seed.sql...');
      const seedPath = path.join(__dirname, 'src/db/seed.sql');
      const seed = fs.readFileSync(seedPath, 'utf8');
      const seedStatements = seed.split(';').map(s => s.trim()).filter(s => s.length > 0);
      for (const stmt of seedStatements) {
        await client.query(stmt);
      }
      console.log('Base de datos inicializada con datos demo.');
    } else {
      console.log('Base de datos ya inicializada. Tablas existentes.');
    }
  } catch (err) {
    console.error('=== ERROR INICIALIZANDO BD ===');
    console.error('Mensaje:', err.message);
    console.error('Código:', err.code);
    console.error('Detalle:', err.detail);
    console.error('Stack:', err.stack);
    console.error('==============================');
  } finally {
    if (client) client.release();
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`SmartHome 5P API corriendo en puerto ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  await initDB();
});
