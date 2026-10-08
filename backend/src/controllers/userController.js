const db = require('../config/db');

exports.getUsuarios = async (req, res) => {
    try {
        // Retorna todos os usuários (exceto as senhas, por segurança)
        const result = await db.query('SELECT id, nome, login, perfil FROM usuarios ORDER BY nome ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

exports.criarUsuario = async (req, res) => {
    const { nome, login, senha, perfil } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO usuarios (nome, login, senha, perfil) VALUES ($1, $2, $3, $4) RETURNING id, nome, login, perfil',
            [nome, login, senha, perfil || 'pesquisador']
        );
        res.status(201).json({ message: 'Usuário criado com sucesso!', usuario: result.rows[0] });
    } catch (error) {
        if (error.code === '23505') { // Código de erro do PostgreSQL para valores duplicados (UNIQUE)
            res.status(400).json({ error: 'Este login já está em uso.' });
        } else {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ error: 'Erro ao salvar os dados no banco' });
        }
    }
};

// Atualiza um usuário existente
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

// Exclui um usuário
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