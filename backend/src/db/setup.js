// Script de inicialización de BD — ejecutar una vez en Render
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('./index');

async function setup() {
  const client = await pool.connect();
  try {
    console.log('Conectando a PostgreSQL...');

    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    console.log('Ejecutando schema.sql...');
    await client.query(schema);
    console.log('Schema creado.');

    const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
    console.log('Ejecutando seed.sql...');
    await client.query(seed);
    console.log('Datos de prueba insertados.');

    console.log('Setup completo. SmartHome 5P listo.');
  } catch (err) {
    console.error('Error en setup:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
