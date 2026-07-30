import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool = null;
let useMock = false;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'revera_db',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} catch (err) {
  console.warn("[Database] MySQL pool creation notice, enabling memory fallback repo:", err.message);
  useMock = true;
}

export async function query(sql, params) {
  if (pool && !useMock) {
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.warn("[Database] MySQL Query Notice (switching to active memory store):", error.message);
    }
  }
  return null;
}

export default pool;
