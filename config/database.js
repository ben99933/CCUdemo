const { Pool } = require('pg');
require('dotenv').config();

const connection = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    ssl: true // 加上這個屬性
});

module.exports = connection;