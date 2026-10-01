const db = require('../config/db');

// Busca a lista de núcleos no banco para preencher o <select> do frontend
exports.getNucleos = async (req, res) => {
    try {
        const result = await db.query('SELECT id, nome, coordenador FROM nucleos ORDER BY nome ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar núcleos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Recebe os dados do formulário e salva no banco de dados
exports.submitForm = async (req, res) => {
    const data = req.body;

    try {
        const query = `
            INSERT INTO formularios (
                nucleo_id, coordenador_selecionado, situacao, vigencia_inicio, vigencia_fim,
                escopo, atividades, procedencia, detalhe_procedencia, originais, especifique_originais,
                genero, outro_genero, outros_dados, detalhe_outros_dados, dados_produzidos, formatos_digitais,
                dados_pessoais, dados_sensiveis, medidas_eticas, detalhe_outra_medida, titularidade, detalhe_titularidade,
                local_armazenamento, outro_local_armazenamento, responsavel_armazenamento, outro_responsavel_armazenamento,
                condicao_acesso, controle_acesso, outra_medida_seguranca, realiza_backup, periodicidade_backup,
                local_backup, detalhe_local_backup, espaco_armazenamento_valor, espaco_armazenamento_unidade,
                prioridade_preservacao, necessidade_ampliacao
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                $21, $22, $23, $24, $25, $26, $27, $28, $29, $30,
                $31, $32, $33, $34, $35, $36, $37, $38
            ) RETURNING id;
        `;

        // Transforma os arrays que vêm dos checkboxes em strings JSON antes de salvar no banco
        const values = [
            data.nucleoId || null,
            data.coordenadorSelecionado,
            data.situacao,
            data.vigenciaInicio || null,
            data.vigenciaFim || null,
            data.escopo,
            data.atividades,
            JSON.stringify(data.procedencia || []),
            data.detalheProcedencia,
            JSON.stringify(data.originais || []),
            data.especifiqueOriginais,
            JSON.stringify(data.genero || []),
            data.outroGenero,
            JSON.stringify(data.outrosDados || []),
            data.detalheOutrosDados,
            JSON.stringify(data.dadosProduzidos || []),
            data.formatosDigitais,
            data.dadosPessoais,
            data.dadosSensiveis,
            JSON.stringify(data.medidasEticas || []),
            data.detalheOutraMedida,
            JSON.stringify(data.titularidade || []),
            data.detalheTitularidade,
            JSON.stringify(data.localArmazenamento || []),
            data.outroLocalArmazenamento,
            data.responsavelArmazenamento,
            data.outroResponsavelArmazenamento,
            data.condicaoAcesso,
            JSON.stringify(data.controleAcesso || []),
            data.outraMedidaSeguranca,
            data.realizaBackup,
            data.periodicidadeBackup,
            JSON.stringify(data.localBackup || []),
            data.detalheLocalBackup,
            data.espacoArmazenamentoValor,
            data.espacoArmazenamentoUnidade,
            data.prioridadePreservacao,
            data.necessidadeAmpliacao
        ];

        const result = await db.query(query, values);
        res.status(201).json({ message: 'Formulário salvo com sucesso!', id: result.rows[0].id });
    } catch (error) {
        console.error('Erro ao salvar formulário:', error);
        res.status(500).json({ error: 'Erro ao salvar os dados no banco' });
    }
};

// Busca todos os formulários preenchidos, cruzando com o nome do núcleo
exports.getFormularios = async (req, res) => {
    try {
        const query = `
            SELECT f.*, n.nome AS nucleo_nome 
            FROM formularios f
            LEFT JOIN nucleos n ON f.nucleo_id = n.id
            ORDER BY f.criado_em DESC
        `;
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar formulários:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar dados' });
    }
};