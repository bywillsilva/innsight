const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Erro de conexão com o banco:', err);
        process.exit(1);  // Finaliza o processo se não conseguir se conectar ao banco
    } else {
        console.log('Conectado ao db');
    }
});

module.exports = db;