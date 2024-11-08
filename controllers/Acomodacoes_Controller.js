const db = require('./../config/db');

const getAcomodacoes = async (req, res) => {
    const query = 'SELECT * FROM propriedades';

    try {
        const [results] = await db.promise().query(query);
        res.render('index', { acomodacoes: results });
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).send('Erro ao buscar dados');
    }
};

const getDetails = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM propriedades WHERE id = ' + id;

    try {
        const [results] = await db.promise().query(query);
        res.render('acomodos', { propriedade: results });
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).send('Erro ao buscar dados');
    }
}

module.exports = { getAcomodacoes, getDetails };