import mysql from 'mysql2/promise';

// Create connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.MYSQL_ADDON_PORT || 3306
});

console.log("✅ Connected to MySQL database");

export default db;
