const express = require('express');
require('dotenv').config();
const session = require('express-session');


const app = express();

const Acomodacao_Routes = require('./routes/Acomodacao_Routes');
const Users_Routes = require('./routes/Users_Routes');

app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Usar HTTPS em produção
    }
}));

// Roteamento
app.use('/', Acomodacao_Routes);
app.use('/', Users_Routes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});