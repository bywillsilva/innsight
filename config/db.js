const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
});

db.connect((err) => {
    if (err) {
        console.log('Erro de conexão com o banco', err);
        return;
    }
    console.log('Conectado ao db');
})

module.exports = db;