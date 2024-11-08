const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '193.203.175.121',     // Host fornecido pela Hostinger
    user: 'u244612010_admin_innsight',          // Usuário do banco de dados
    password: 'Innsight12@',     // Senha do banco de dados
    database: 'u244612010_innsight' // Nome do banco de dados
});

db.connect((err) => {
    if (err) {
        console.log('Erro de conexão com o banco', err);
        return;
    }
    console.log('Conectado ao db');
})

module.exports = db;