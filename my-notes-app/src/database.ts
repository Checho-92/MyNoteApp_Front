import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost', // Cambia esto según tu configuración
  user: 'root', // Cambia esto según tu configuración
  password: '', // Cambia esto según tu configuración
  database: 'mynotesapp', // Cambia esto según tu configuración
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
