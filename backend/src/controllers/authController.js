const db = require('../config/db');

exports.login = async (req, res) => {
    const { login, senha } = req.body;
    try {
        const result = await db.query(
            'SELECT id, nome, perfil FROM usuarios WHERE login = $1 AND senha = $2',
            [login, senha]
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};