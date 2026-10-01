const xlsx = require('xlsx');
const path = require('path');
const db = require('../config/db');

async function importarNucleos() {
    try {
        const filePath = path.join(__dirname, '../../Núcleos do projeto (2022 a 2026).xlsx');
        
        console.log('Lendo o arquivo Excel...');
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        
        // O parâmetro { range: 1 } faz o leitor pular a primeira linha (cabeçalho longo) 
        // e considerar a segunda linha como os nomes reais das colunas
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { range: 1 });

        console.log(`Lidos ${data.length} registros da planilha. Iniciando inserção no banco...`);

        // Limpa a tabela antes de inserir para evitar núcleos duplicados caso você rode o script várias vezes
        await db.query('TRUNCATE TABLE nucleos RESTART IDENTITY CASCADE');

        let count = 0;
        for (const row of data) {
            // Nomes exatos das colunas conforme o seu arquivo Excel
            const nomeNucleo = row['Núcleo'];
            const coordenador = row['Coordenador(a)'];

            if (nomeNucleo) {
                await db.query(
                    'INSERT INTO nucleos (nome, coordenador) VALUES ($1, $2)',
                    [nomeNucleo, coordenador || 'Não informado']
                );
                count++;
            }
        }

        console.log(`Importação concluída! ${count} núcleos inseridos com sucesso.`);
    } catch (error) {
        console.error('Erro ao importar a planilha:', error);
    } finally {
        process.exit(0);
    }
}

importarNucleos();