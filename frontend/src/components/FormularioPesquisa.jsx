import React, { useState, useEffect } from 'react';

export default function FormularioPesquisa() {
  const [nucleos, setNucleos] = useState([]);
  const [coordenadores, setCoordenadores] = useState([]);

  const [formData, setFormData] = useState({
    nucleoId: '', situacao: '', vigenciaInicio: '', vigenciaFim: '',
    escopo: '', coordenadorSelecionado: '', atividades: '',
    
    procedencia: [], detalheProcedencia: '', 
    originais: [], especifiqueOriginais: '', 
    
    genero: [], outroGenero: '', 
    outrosDados: [], detalheOutrosDados: '', 
    
    dadosProduzidos: [], formatosDigitais: '', 
    dadosPessoais: '', dadosSensiveis: '', 
    medidasEticas: [], detalheOutraMedida: '', 
    titularidade: [], detalheTitularidade: '',
    
    localArmazenamento: [], outroLocalArmazenamento: '',
    responsavelArmazenamento: '', outroResponsavelArmazenamento: '',
    condicaoAcesso: '', 
    controleAcesso: [], outraMedidaSeguranca: '',
    realizaBackup: '', periodicidadeBackup: '', 
    localBackup: [], detalheLocalBackup: '',
    espacoArmazenamentoValor: '', espacoArmazenamentoUnidade: 'GB',
    prioridadePreservacao: '', necessidadeAmpliacao: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/formularios/nucleos')
      .then(res => {
        if (!res.ok) throw new Error('Servidor offline ou erro na rota');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setNucleos(data);
          const coords = [...new Set(data.map(n => n.coordenador).filter(Boolean))];
          setCoordenadores(coords);
        }
      })
      .catch(err => {
        console.error('Erro ao conectar com a API:', err);
        setNucleos([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/formularios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Formulário enviado com sucesso para o banco de dados!');
      } else {
        alert('Erro ao salvar o formulário.');
      }
    } catch (error) {
      alert('Falha na conexão com o servidor. O backend está rodando?');
    }
  };

  const mostrarDetalheBackup = formData.localBackup.some(loc => 
    ['Instituição parceira', 'Outra unidade física', 'Outro local'].includes(loc)
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900 border-b pb-4">
        Diagnóstico da documentação e dos dados de pesquisa da FCJA
      </h1>

      {/* 1. Dados básicos */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">1. Dados básicos do núcleo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Nome do núcleo*</label>
            <select name="nucleoId" onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Selecione o núcleo</option>
              {nucleos.map(n => <option key={n.id} value={n.id}>{n.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Coordenador(a)*</label>
            <select name="coordenadorSelecionado" onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Selecione o coordenador</option>
              {coordenadores.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <label className="block font-semibold mb-2">Situação do núcleo*</label>
        <div className="flex gap-4 mb-4">
          <label><input type="radio" name="situacao" value="Em atividade" onChange={handleChange} required className="mr-2"/>Em atividade</label>
          <label><input type="radio" name="situacao" value="Encerrado" onChange={handleChange} required className="mr-2"/>Encerrado</label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><label className="block font-semibold mb-2">Vigência (Início)</label><input type="date" name="vigenciaInicio" onChange={handleChange} className="w-full border p-2 rounded" /></div>
          <div><label className="block font-semibold mb-2">Vigência (Fim)</label><input type="date" name="vigenciaFim" onChange={handleChange} className="w-full border p-2 rounded" /></div>
        </div>

        <label className="block font-semibold mb-2">Escopo</label>
        <textarea name="escopo" onChange={handleChange} className="w-full border p-2 rounded mb-4" rows="3"></textarea>

        <label className="block font-semibold mb-2">Atividades desenvolvidas</label>
        <textarea name="atividades" onChange={handleChange} className="w-full border p-2 rounded" rows="3"></textarea>
      </section>

      {/* 2. Procedência e Originais */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">2. Procedência e Originais</h2>
        
        <label className="block font-semibold mb-2">Qual a procedência da documentação e/ou dados utilizados?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Doação', 'Aquisição', 'Recolhimento', 'Comodato', 'Transferência', 'Empréstimo', 'Pertencentes a pesquisador', 'Disponíveis na internet', 'Reprodução de outra instituição', 'Outra procedência'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="procedencia" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="detalheProcedencia" placeholder="Detalhe um pouco mais sobre a procedência..." onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2" rows="2"></textarea>

        <label className="block font-semibold mb-2">Sobre a existência dos documentos originais</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {['Estão na FCJA', 'Estão em outra instituição', 'Dispersos em locais diferentes', 'Trabalha só com cópias', 'Sob custódia do núcleo', 'Localização desconhecida', 'Não se aplica'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="originais" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="especifiqueOriginais" placeholder="Especifique sobre o uso de originais..." onChange={handleChange} className="w-full border p-2 rounded mt-2" rows="2"></textarea>
      </section>

      {/* 3. Gênero e Tipos de Dados */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">3. Gênero e Tipos de Dados</h2>
        
        <label className="block font-semibold mb-2">Em relação ao gênero dos documentos:</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {['Textual', 'Iconográfico', 'Sonoros', 'Filmográfico', 'Cartográfico', 'Tridimensional'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="genero" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <input type="text" name="outroGenero" placeholder="Outro gênero documental (especificar)" onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2" />

        <label className="block font-semibold mb-2">Existem outros tipos de dados coletados?</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Material bibliográfico', 'Entrevistas', 'Dados estatísticos', 'Fotografias', 'Registros audiovisuais', 'Coordenadas geográficas', 'Códigos', 'Depoimentos', 'Bases de dados', 'Cartografia', 'Modelos tridimensionais', 'Algoritmos', 'Dados abertos', 'Outro', 'Não são coletados'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="outrosDados" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="detalheOutrosDados" placeholder="Detalhe a utilização desses dados..." onChange={handleChange} className="w-full border p-2 rounded mt-2" rows="2"></textarea>
      </section>

      {/* 4. Produção, Formatos e Ética */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">4. Dados Produzidos e Ética</h2>

        <label className="block font-semibold mb-2">Documentos/dados produzidos pelo núcleo:</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {['Relatórios técnicos', 'Fotografias', 'Vídeos', 'Bases de dados', 'Modelos tridimensionais', 'Transcrições', 'Áudios', 'Planilhas', 'Mapas', 'Códigos', 'Catálogos', 'Outro', 'Não foram produzidos'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="dadosProduzidos" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>

        <label className="block font-semibold mb-2">Quais os formatos dos objetos digitais? (Ex: pdf, docx, wav, JPEG)</label>
        <input type="text" name="formatosDigitais" onChange={handleChange} className="w-full border p-2 rounded mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Há existência de dados pessoais?</label>
            {['Sim', 'Não', 'Não informado', 'Em análise', 'Não se aplica'].map(opt => (
              <label key={opt} className="block text-sm"><input type="radio" name="dadosPessoais" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
            ))}
          </div>
          <div>
            <label className="block font-semibold mb-2">Enquadram-se como sensíveis?</label>
            {['Sim', 'Não', 'Não informado', 'Em análise', 'Não se aplica'].map(opt => (
              <label key={opt} className="block text-sm"><input type="radio" name="dadosSensiveis" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
            ))}
          </div>
        </div>

        <label className="block font-semibold mb-2">Medidas adotadas para questões éticas:</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {['Consentimento dos participantes', 'Autorização de imagem', 'Anonimização', 'Restrição de acesso', 'Confidencialidade', 'Eliminação de informações', 'TCLE', 'Autorização de voz', 'Pseudoanonimização', 'Controle por usuário', 'Restrição de divulgação', 'Não se aplica'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="medidasEticas" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <input type="text" name="detalheOutraMedida" placeholder="Outra medida (Detalhar)" onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2" />

        <label className="block font-semibold mb-2">Titularidade dos direitos dos dados coletados:</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['FCJA', 'Autor original', 'Entrevistado', 'Pessoa física', 'Compartilhada', 'Coordenador/Pesquisador', 'Doador', 'Outra instituição', 'Domínio público', 'Desconhecida', 'Não se aplica'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="titularidade" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="detalheTitularidade" placeholder="Detalhamento da titularidade..." onChange={handleChange} className="w-full border p-2 rounded mt-2" rows="2"></textarea>
      </section>

      {/* 5. Armazenamento, segurança e backup */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">5. Armazenamento, segurança e backup</h2>
        
        {/* Local de Armazenamento */}
        <label className="block font-semibold mb-2">Local de armazenamento</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Computador institucional', 'Computador pessoal', 'Servidor local', 'Nuvem institucional', 'Nuvem pública', 'Repositório online', 'Sistema de gestão', 'Sistema museológico', 'HD Externo', 'Disco Óptico', 'Pen Drive', 'Sistema de biblioteca', 'Banco de Dados', 'Outro Local'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="localArmazenamento" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        {formData.localArmazenamento.includes('Outro Local') && (
          <input type="text" name="outroLocalArmazenamento" placeholder="Especifique o outro local..." onChange={handleChange} className="w-full border p-2 rounded mb-4 mt-2" required />
        )}

        {/* Responsável pelo armazenamento */}
        <label className="block font-semibold mb-2 mt-4">Responsável pelo armazenamento</label>
        <select name="responsavelArmazenamento" onChange={handleChange} className="w-full border p-2 rounded mb-2">
          <option value="">Selecione o responsável</option>
          {['Pesquisador do núcleo', 'Setor de TI', 'Fundação', 'Responsabilidade compartilhada', 'Não há responsável formalmente definido', 'Equipe do núcleo', 'Setor do arquivo', 'Museu', 'Instituição parceira', 'Biblioteca', 'Outro responsável'].map(opt => (
             <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {formData.responsavelArmazenamento === 'Outro responsável' && (
          <input type="text" name="outroResponsavelArmazenamento" placeholder="Especifique o outro responsável..." onChange={handleChange} className="w-full border p-2 rounded mb-4" required />
        )}

        {/* Condição de acesso aos dados */}
        <label className="block font-semibold mb-2 mt-4">Condição de acesso aos dados</label>
        <select name="condicaoAcesso" onChange={handleChange} className="w-full border p-2 rounded mb-6">
          <option value="">Selecione a condição</option>
          {['Acesso Aberto', 'Acesso parcialmente aberto', 'Acesso restrito', 'Acesso mediante autorização', 'Acesso somente à equipe do núcleo', 'Acesso somente à FCJA', 'Acesso sob embargo temporário', 'Acesso condicionado aos direitos autorais', 'Acesso condicionado à proteção de dados pessoais', 'Situação em análise'].map(opt => (
             <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {/* Medidas de controle de acesso */}
        <label className="block font-semibold mb-2">Medidas de controle de acesso e segurança</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {['Uso de senhas', 'Autenticação em duas etapas', 'Restrição de IP', 'Perfis de permissão', 'Registros de acesso', 'Controle de acesso físico', 'Termo de responsabilidade', 'Não há controle formal', 'Outra medida de segurança'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="controleAcesso" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        {formData.controleAcesso.includes('Outra medida de segurança') && (
          <input type="text" name="outraMedidaSeguranca" placeholder="Especifique a outra medida..." onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2" required />
        )}

        {/* Backup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">É realizado algum tipo de backup?*</label>
            <label className="mr-4"><input type="radio" name="realizaBackup" value="Sim" onChange={handleChange} className="mr-1" required/> Sim</label>
            <label><input type="radio" name="realizaBackup" value="Não" onChange={handleChange} className="mr-1" required/> Não</label>
          </div>
          <div>
            <label className="block font-semibold mb-2">Periodicidade do backup*</label>
            <select name="periodicidadeBackup" onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Selecione a periodicidade</option>
              {['Automático e contínuo', 'Diário', 'Semanal', 'Quinzenal', 'Mensal', 'Trimestral', 'Semestral', 'Anual', 'Eventual', 'Sem periodicidade definida'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Local do Backup */}
        <label className="block font-semibold mb-2">Local do Backup*</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Servidor institucional', 'Servidor Externo', 'Nuvem Institucional', 'Nuvem pessoal', 'HD Externo', 'Computador diferente', 'Repositório Digital', 'Outra unidade física', 'Instituição parceira', 'O backup não é realizado', 'Outro local'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="localBackup" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        {mostrarDetalheBackup && (
          <textarea name="detalheLocalBackup" placeholder="Detalhamento do local do backup..." onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2" rows="2" required></textarea>
        )}

        {/* Espaço, Prioridade e Ampliação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div>
            <label className="block font-semibold mb-2">Espaço utilizado</label>
            <div className="flex">
              <input type="number" name="espacoArmazenamentoValor" onChange={handleChange} className="w-2/3 border p-2 rounded-l" placeholder="Ex: 500" />
              <select name="espacoArmazenamentoUnidade" onChange={handleChange} className="w-1/3 border p-2 rounded-r bg-gray-100">
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">Prioridade de preservação*</label>
            <select name="prioridadePreservacao" onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Selecione</option>
              {['Muito Alta', 'Alta', 'Média', 'Baixa', 'Sem prioridade definida', 'Ainda não avaliada'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Necessidade de ampliação*</label>
            <select name="necessidadeAmpliacao" onChange={handleChange} className="w-full border p-2 rounded" required>
              <option value="">Selecione</option>
              {['Sim', 'Não', 'Em análise', 'Não informado', 'Não se aplica'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
      </section>

      <button type="submit" className="w-full bg-blue-700 text-white text-lg px-6 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-md">
        Enviar Diagnóstico Completo
      </button>
    </form>
  );
}