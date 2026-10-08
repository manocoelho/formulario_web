const db = require('../config/db');

// 1. LER: Busca todos os usuários
exports.getUsuarios = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM usuarios ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno ao buscar usuários' });
    }
};

// 2. CRIAR: Cadastra um novo usuário (A função que estava a faltar!)
exports.createUsuario = async (req, res) => {
    try {
        const { nome, login, senha, perfil } = req.body;
        await db.query(
            'INSERT INTO usuarios (nome, login, senha, perfil) VALUES ($1, $2, $3, $4)',
            [nome, login, senha, perfil]
        );
        res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao cadastrar usuário' });
    }
};

// 3. ATUALIZAR: Edita um usuário existente
exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, login, senha, perfil } = req.body;
        
        // Se a senha foi preenchida, atualiza tudo. Se não, atualiza sem alterar a senha.
        if (senha) {
            await db.query(
                'UPDATE usuarios SET nome = $1, login = $2, senha = $3, perfil = $4 WHERE id = $5', 
                [nome, login, senha, perfil, id]
            );
        } else {
            await db.query(
                'UPDATE usuarios SET nome = $1, login = $2, perfil = $3 WHERE id = $4', 
                [nome, login, perfil, id]
            );
        }
        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
    }
};

// 4. EXCLUIR: Apaga um usuário
exports.deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        res.status(500).json({ error: 'Erro interno ao excluir usuário' });
    }
};