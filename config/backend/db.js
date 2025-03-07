const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME, // เปลี่ยนจาก DB_USER เป็น DB_USERNAME
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, // เปลี่ยนจาก DB_NAME เป็น DB_DATABASE
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
  },
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Database connected successfully!");
    connection.release();
  }
});

module.exports = pool.promise();
