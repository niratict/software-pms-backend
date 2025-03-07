// เพิ่มบรรทัดนี้ที่ด้านบนสุดของ db.js
require("dotenv").config();

const mysql = require("mysql2");

// เพิ่ม log เพื่อดูว่าใช้ค่าอะไรในการเชื่อมต่อ
console.log("DB Connection Config:");
console.log(`Host: ${process.env.DB_HOST}`);
console.log(`Port: ${process.env.DB_PORT}`);
console.log(`User: ${process.env.DB_USERNAME}`);
console.log(`Database: ${process.env.DB_DATABASE}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 4000,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    minVersion: "TLSv1.2",
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
