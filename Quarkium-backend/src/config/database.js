// backend/src/config/database.js
const mysql = require("mysql2/promise");
require("dotenv").config();

// Creamos un "Pool" de conexiones. Esto es vital para un SaaS.
// En lugar de abrir y cerrar una conexión por cada cliente, el pool recicla conexiones,
// permitiendo manejar cientos de reservas concurrentes sin saturar MySQL.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Máximo 10 conexiones simultáneas (suficiente para dev)
  queueLimit: 0,
});

// Comprobación de que la conexión funciona correctamente al arrancar
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ Base de datos [quarkium] conectada con éxito.");
    connection.release(); // Liberamos la conexión de vuelta al pool
  })
  .catch((err) => {
    console.error("❌ Error fatal conectando a la base de datos:");
    console.error(err.message);
    console.error("Revisa tu .env y asegúrate de que MySQL está corriendo.");
  });

module.exports = pool;
