const mysql = require("mysql2");
const { Pool, Client } = require('pg')
require('dotenv').config();

const connection = new Client(
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
);
// const connection = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }
// });

module.exports = connection;