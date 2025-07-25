import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;
dotenv.config();

// Needed for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Read and run schema
const schemaPath = path.join(__dirname, '../config/schema.sql');
const schema = await readFile(schemaPath, 'utf8');

try {
  await pool.query(schema);
  console.log('✅ Tickets table created successfully!');
} catch (err) {
  console.error('❌ Error creating table:', err.message);
} finally {
  await pool.end();
}
