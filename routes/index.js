const express = require('express');
const path = require('path');

const router = express.Router();
const { getAcomodacoes, getDetails } = require('./../controllers/Acomodacoes_Controller');

// Rota principal
router.get('/', getAcomodacoes);

// Rota detalhes
router.get('/details/id=:id', getDetails);

// style home
router.get('/home-style', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'css', 'home', 'index.css'))
});

// style details
router.get('/details-style', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'css', 'acomodos', 'acomodos.css'))
});

module.exports = router;