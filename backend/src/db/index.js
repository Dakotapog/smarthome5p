const { Pool } = require('pg');

const sslConfig = process.env.DATABASE_URL && process.env.DATABASE_URL.includes('render.com')
  ? { rejectUnauthorized: false }
  : process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('Error en pool PostgreSQL:', err);
});

module.exports = { pool };
