const db = require('./../config/db');


const getUsers = async (req, res) => {
    const query = 'SELECT * FROM users';
    
    try {
        const [results] = await db.promise().query(query);
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).send('Erro ao buscar dados');
    }
};

const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;
    
    try {
        const [results] = await db.promise().query(query, [email]);

        if (results.length == 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        const user = results[0];

        if (senha == user.senha) {
            req.session.user = {
                id: user.id,
                email: user.email
            };
    
            res.redirect('/')
        } else {
            return res.status(404).send('Usuário/senha incorretos');
        }
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).send('Erro ao buscar dados');
    }
};

const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erro ao destruir sessão');
        }
        res.redirect('/');
    });
}

module.exports = { getUsers, loginUser, logoutUser };