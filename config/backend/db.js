const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // เพิ่ม port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    // เพิ่มการตั้งค่า SSL
    rejectUnauthorized: true,
  },
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully!");
    connection.release(); // Release connection back to the pool
  }
});

module.exports = pool.promise();
