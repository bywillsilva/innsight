require('dotenv').config();
const express = require('express');

const path = require('path');
const app = express();

const routes = require('./routes/index');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Usando as rotas
app.use('/', routes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});