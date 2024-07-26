require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        server: process.env.DB_SERVER,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
};