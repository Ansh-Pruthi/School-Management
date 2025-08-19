import mysql from 'mysql2/promise';

// Create connection
const db = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'school_management'
});

console.log("✅ Connected to MySQL database");

export default db;
