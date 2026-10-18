import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';

// Componente reutilizável para o ícone de interrogação com o texto flutuante (Tooltip)
const TooltipInfo = ({ texto }) => (
  <div className="relative flex items-center group ml-2 cursor-help">
    <HelpCircle size={18} className="text-blue-500 group-hover:text-blue-800 transition-colors" />
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50 text-justify font-normal pointer-events-none leading-relaxed">
      {texto}
      {/* Triângulo apontando para baixo */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

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
    
    dadosProduzidos: [], outroDadoProduzido: '', formatosDigitais: '', 
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const carregarNucleos = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/formularios/nucleos`);
            if (response.ok) {
                const data = await response.json();
                setNucleos(data);
            }
        } catch (error) {
            console.error("Erro ao carregar núcleos:", error);
        }
    };
    carregarNucleos();
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

  const coordenadoresUnicos = [...new Set(
    nucleos
      .map((n) => n.coordenador)
      .filter(Boolean)
      .flatMap((coord) => coord.split(' e ').map((nome) => nome.trim()))
  )].sort();

  const handleNucleoChange = (e) => {
    const idSelecionado = e.target.value;
    const nucleoCompleto = nucleos.find((n) => n.id.toString() === idSelecionado);
    
    setFormData({
      ...formData,
      nucleoId: idSelecionado,
      coordenadorSelecionado: nucleoCompleto ? nucleoCompleto.coordenador : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/formularios`, {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Nome do núcleo*</label>
              <TooltipInfo texto="Selecione a denominação oficial do núcleo ao qual pertencem os documentos e dados diagnosticados." />
            </div>
            <select 
              name="nucleoId" 
              value={formData.nucleoId} 
              onChange={handleNucleoChange} 
              required 
              className="w-full border p-2 rounded outline-none focus:border-blue-500 bg-white"
            >
              <option value="">Selecione o núcleo</option>
              {nucleos.map(n => <option key={n.id} value={n.id}>{n.nome}</option>)}
            </select>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Coordenador(a)*</label>
              <TooltipInfo texto="Selecione o nome da pessoa responsável pela coordenação do núcleo. (Preenchimento automático ao selecionar o núcleo)." />
            </div>
            <select 
              name="coordenadorSelecionado" 
              value={formData.coordenadorSelecionado} 
              onChange={handleChange} 
              required 
              className="w-full border p-2 rounded outline-none focus:border-blue-500 bg-gray-50"
            >
              <option value="">Selecione o coordenador</option>
              {coordenadoresUnicos.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center mb-2 mt-6">
          <label className="block font-semibold">Situação do núcleo*</label>
          <TooltipInfo texto="Informe se as atividades estão em andamento ou encerradas. Considere a situação da pesquisa ou da etapa diagnosticada." />
        </div>
        <div className="flex gap-4 mb-6">
          <label><input type="radio" name="situacao" value="Em atividade" onChange={handleChange} required className="mr-2"/>Em atividade</label>
          <label><input type="radio" name="situacao" value="Encerrado" onChange={handleChange} required className="mr-2"/>Encerrado</label>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Vigência (Início)</label>
              <TooltipInfo texto="Informe a data de início do núcleo ou da etapa de pesquisa abrangida pelo diagnóstico." />
            </div>
            <input type="date" name="vigenciaInicio" onChange={handleChange} className="w-full border p-2 rounded outline-none focus:border-blue-500" />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Vigência (Fim)</label>
              <TooltipInfo texto="Informe a data de término. Quando não houver encerramento definido, deixe este campo em branco." />
            </div>
            <input type="date" name="vigenciaFim" onChange={handleChange} className="w-full border p-2 rounded outline-none focus:border-blue-500" />
          </div>
        </div>

        <div className="flex items-center mb-2 mt-4">
          <label className="block font-semibold">Escopo</label>
          <TooltipInfo texto="Descreva o tema, os objetivos e os limites da pesquisa. Identifique os acervos, as coleções, os períodos e espaços estudados." />
        </div>
        <textarea name="escopo" onChange={handleChange} className="w-full border p-2 rounded mb-6 outline-none focus:border-blue-500" rows="3"></textarea>

        <div className="flex items-center mb-2">
          <label className="block font-semibold">Atividades desenvolvidas</label>
          <TooltipInfo texto="Informe as principais ações realizadas ou em execução, como pesquisa documental, catalogação, digitalização, entrevistas, etc." />
        </div>
        <textarea name="atividades" onChange={handleChange} className="w-full border p-2 rounded outline-none focus:border-blue-500" rows="3"></textarea>
      </section>

      {/* 2. Procedência e Originais */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">2. Procedência e Originais dos documentos produzidos pelo Núcleo</h2>
        
        <div className="flex items-center mb-2">
          <label className="block font-semibold">Qual a origem dos documentos ou dados que o grupo utiliza para suas pesquisas?</label>
          <TooltipInfo texto="Assinale como os documentos e dados foram obtidos ou constituídos. Pode marcar múltiplas alternativas." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Doação', 'Aquisição', 'Recolhimento', 'Comodato', 'Transferência', 'Empréstimo', 'Pertencentes a pesquisador', 'Disponíveis na internet', 'Reprodução de outra instituição', 'Outra procedência'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="procedencia" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="detalheProcedencia" placeholder="Detalhe um pouco mais sobre a procedência..." onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2 outline-none focus:border-blue-500" rows="2"></textarea>

        <div className="flex items-center mb-2">
          <label className="block font-semibold">Sobre a existência das fontes originais de apoio a pesquisa.</label>
          <TooltipInfo texto="Informe se os documentos utilizados possuem originais identificados e onde estão sob guarda física ou digital." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {['Estão na FCJA', 'Estão em outra instituição', 'Dispersos em locais diferentes', 'Trabalha só com cópias', 'Sob custódia do núcleo', 'Localização desconhecida', 'Não se aplica'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="originais" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="especifiqueOriginais" placeholder="Outra procedência. Especificar abaixo a origem das fontes originais caso não esteja especificado acima." onChange={handleChange} className="w-full border p-2 rounded mt-2 outline-none focus:border-blue-500" rows="2"></textarea>
      </section>

      {/* 3. Gênero e Tipos de Dados */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">3. Gênero e Tipos de Dados</h2>
        
        <div className="flex items-center mb-2">
          <label className="block font-semibold">Em relação ao gênero dos documentos:</label>
          <TooltipInfo texto="Assinale os gêneros presentes no conjunto (ex: Textual para relatórios, Iconográfico para fotografias, etc)." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          {['Textual', 'Iconográfico', 'Sonoros', 'Filmográfico', 'Cartográfico', 'Tridimensional'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="genero" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <input type="text" name="outroGenero" placeholder="Outro gênero documental (especificar se houver)" onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2 outline-none focus:border-blue-500" />

        <div className="flex items-center mb-2">
          <label className="block font-semibold">Existem outros tipos de dados coletados?</label>
          <TooltipInfo texto="Selecione os tipos de dados utilizados na pesquisa, como depoimentos, registros de campo, bases de dados..." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Material bibliográfico', 'Entrevistas', 'Dados estatísticos', 'Fotografias', 'Registros audiovisuais', 'Coordenadas geográficas', 'Códigos', 'Depoimentos', 'Bases de dados', 'Cartografia', 'Modelos tridimensionais', 'Algoritmos', 'Dados abertos', 'Outro', 'Não são coletados'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="outrosDados" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="detalheOutrosDados" placeholder="Detalhe o tipo desses dados..." onChange={handleChange} className="w-full border p-2 rounded mt-2 outline-none focus:border-blue-500" rows="2"></textarea>
      </section>

      {/* 4. Produção, Formatos e Ética */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">4. Dados Produzidos pelo Núcleo de Pesquisa</h2>

        <div className="flex items-center mb-2">
          <label className="block font-semibold">Documentos/dados produzidos pelo núcleo:</label>
          <TooltipInfo texto="Assinale os materiais gerados pela equipa do núcleo (ex: planilhas criadas, reproduções digitais, transcrições)." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Relatórios técnicos', 'Fotografias', 'Vídeos', 'Bases de dados', 'Modelos tridimensionais', 'Transcrições', 'Áudios', 'Planilhas', 'Mapas', 'Códigos', 'Catálogos', 'Outro', 'Não foram produzidos'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="dadosProduzidos" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        {formData.dadosProduzidos.includes('Outro') && (
          <input type="text" name="outroDadoProduzido" placeholder="Especifique o outro documento ou dado produzido..." onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2 outline-none focus:border-blue-500" required />
        )}

        <div className="flex items-center mb-2 mt-4">
          <label className="block font-semibold">Quais os formatos dos objetos digitais? (Ex: pdf, docx, wav, JPEG)</label>
          <TooltipInfo texto="Informe as extensões dos arquivos existentes na pesquisa, separadas por vírgula." />
        </div>
        <input type="text" name="formatosDigitais" onChange={handleChange} className="w-full border p-2 rounded mb-6 outline-none focus:border-blue-500" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Há existência de dados pessoais?</label>
              <TooltipInfo texto="Informe se o conjunto contém informações que permitem identificar pessoas (nomes, contatos, imagens, etc)." />
            </div>
            {['Sim', 'Não', 'Não informado', 'Em análise', 'Não se aplica'].map(opt => (
              <label key={opt} className="block text-sm"><input type="radio" name="dadosPessoais" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
            ))}
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Enquadram-se como sensíveis?</label>
              <TooltipInfo texto="Informe se há dados pessoais relacionados à origem racial, saúde, convicção religiosa, etc." />
            </div>
            {['Sim', 'Não', 'Não informado', 'Em análise', 'Não se aplica'].map(opt => (
              <label key={opt} className="block text-sm"><input type="radio" name="dadosSensiveis" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
            ))}
          </div>
        </div>

        <div className="flex items-center mb-2 mt-4">
          <label className="block font-semibold">Medidas adotadas para questões éticas:</label>
          <TooltipInfo texto="Assinale os procedimentos efetivamente adotados para assegurar a ética da pesquisa." />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {['Consentimento dos participantes', 'Autorização de imagem', 'Anonimização', 'Restrição de acesso', 'Confidencialidade', 'Eliminação de informações', 'TCLE', 'Autorização de voz', 'Pseudoanonimização', 'Controle por usuário', 'Restrição de divulgação', 'Não se aplica'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="medidasEticas" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <input type="text" name="detalheOutraMedida" placeholder="Outra medida adotada (Detalhar especificidades éticas)" onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2 outline-none focus:border-blue-500" />

        <div className="flex items-center mb-2">
          <label className="block font-semibold">Titularidade dos direitos dos dados coletados:</label>
          <TooltipInfo texto="Informe os titulares conhecidos dos direitos autorais sobre as obras e os materiais." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['FCJA', 'Autor original', 'Entrevistado', 'Pessoa física', 'Compartilhada', 'Coordenador/Pesquisador', 'Doador', 'Outra instituição', 'Domínio público', 'Desconhecida', 'Não se aplica'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="titularidade" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        <textarea name="detalheTitularidade" placeholder="Detalhamento da titularidade, licenciamentos ou eventuais limites de uso..." onChange={handleChange} className="w-full border p-2 rounded mt-2 outline-none focus:border-blue-500" rows="2"></textarea>
      </section>

      {/* 5. Armazenamento, segurança e backup */}
      <section className="mb-10 p-6 bg-gray-50 rounded border">
        <h2 className="text-xl font-bold mb-4 text-blue-800">5. Armazenamento, segurança, cópias de segurança e preservação</h2>
        
        {/* Local de Armazenamento */}
        <div className="flex items-center mb-2">
          <label className="block font-semibold">Local de armazenamento</label>
          <TooltipInfo texto="Assinale onde os arquivos digitais estão armazenados atualmente. Indique todos os locais utilizados." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Computador institucional', 'Computador pessoal', 'Servidor local', 'Nuvem institucional', 'Nuvem pública', 'Repositório online', 'Sistema de gestão', 'Sistema museológico', 'HD Externo', 'Disco Óptico', 'Pen Drive', 'Sistema de biblioteca', 'Banco de Dados', 'Outro Local'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="localArmazenamento" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        {formData.localArmazenamento.includes('Outro Local') && (
          <input type="text" name="outroLocalArmazenamento" placeholder="Especifique o outro local de armazenamento (sem registrar senhas)..." onChange={handleChange} className="w-full border p-2 rounded mb-4 mt-2 outline-none focus:border-blue-500" required />
        )}

        {/* Responsável pelo armazenamento */}
        <div className="flex items-center mb-2 mt-6">
          <label className="block font-semibold">Responsável pelo armazenamento</label>
          <TooltipInfo texto="Selecione a pessoa, equipe ou unidade que administra e acompanha a integridade dos arquivos." />
        </div>
        <select name="responsavelArmazenamento" onChange={handleChange} className="w-full border p-2 rounded mb-2 outline-none focus:border-blue-500">
          <option value="">Selecione o responsável</option>
          {['Pesquisador do núcleo', 'Setor de TI', 'Fundação', 'Responsabilidade compartilhada', 'Não há responsável formalmente definido', 'Equipe do núcleo', 'Setor do arquivo', 'Museu', 'Instituição parceira', 'Biblioteca', 'Outro responsável'].map(opt => (
             <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {formData.responsavelArmazenamento === 'Outro responsável' && (
          <input type="text" name="outroResponsavelArmazenamento" placeholder="Especifique o outro responsável..." onChange={handleChange} className="w-full border p-2 rounded mb-4 outline-none focus:border-blue-500" required />
        )}

        {/* Condição de acesso aos dados */}
        <div className="flex items-center mb-2 mt-6">
          <label className="block font-semibold">Condição de acesso aos dados</label>
          <TooltipInfo texto="Informe quem pode consultar o acervo atualmente (ex: se é aberto ao público ou restrito à equipe)." />
        </div>
        <select name="condicaoAcesso" onChange={handleChange} className="w-full border p-2 rounded mb-6 outline-none focus:border-blue-500">
          <option value="">Selecione a condição</option>
          {['Acesso Aberto', 'Acesso parcialmente aberto', 'Acesso restrito', 'Acesso mediante autorização', 'Acesso somente à equipe do núcleo', 'Acesso somente à FCJA', 'Acesso sob embargo temporário', 'Acesso condicionado aos direitos autorais', 'Acesso condicionado à proteção de dados pessoais'].map(opt => (
             <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        {/* Medidas de controle de acesso */}
        <div className="flex items-center mb-2">
          <label className="block font-semibold">Medidas de controle de acesso e segurança</label>
          <TooltipInfo texto="Assinale as medidas ativas utilizadas para proteger o acesso (como senhas, restrição de IPs, etc)." />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          {['Uso de senhas', 'Autenticação em duas etapas', 'Restrição de IP', 'Perfis de permissão', 'Registros de acesso', 'Controle de acesso físico', 'Termo de responsabilidade', 'Não há controle formal', 'Outra medida de segurança'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="controleAcesso" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        {formData.controleAcesso.includes('Outra medida de segurança') && (
          <input type="text" name="outraMedidaSeguranca" placeholder="Especifique a outra medida de segurança..." onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2 outline-none focus:border-blue-500" required />
        )}

        {/* Backup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-6">
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">É realizado algum tipo de backup?*</label>
              <TooltipInfo texto="Indique se são mantidas cópias de segurança dos arquivos para recuperação em caso de perda ou falha." />
            </div>
            <label className="mr-4"><input type="radio" name="realizaBackup" value="Sim" onChange={handleChange} className="mr-1" required/> Sim</label>
            <label><input type="radio" name="realizaBackup" value="Não" onChange={handleChange} className="mr-1" required/> Não</label>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Periodicidade do backup*</label>
              <TooltipInfo texto="Informe a frequência real com que as cópias de segurança são atualizadas." />
            </div>
            <select name="periodicidadeBackup" onChange={handleChange} className="w-full border p-2 rounded outline-none focus:border-blue-500" required>
              <option value="">Selecione a periodicidade</option>
              {['Automático e contínuo', 'Diário', 'Semanal', 'Quinzenal', 'Mensal', 'Trimestral', 'Semestral', 'Anual', 'Eventual', 'Sem periodicidade definida'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Local do Backup */}
        <div className="flex items-center mb-2">
          <label className="block font-semibold">Local do Backup*</label>
          <TooltipInfo texto="Assinale onde as cópias de segurança são mantidas. Esclareça a sua localização no detalhamento." />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
          {['Servidor institucional', 'Servidor Externo', 'Nuvem Institucional', 'Nuvem pessoal', 'HD Externo', 'Computador diferente', 'Repositório Digital', 'Outra unidade física', 'Instituição parceira', 'O backup não é realizado', 'Outro local'].map(opt => (
            <label key={opt} className="text-sm"><input type="checkbox" name="localBackup" value={opt} onChange={handleChange} className="mr-2"/>{opt}</label>
          ))}
        </div>
        {mostrarDetalheBackup && (
          <textarea name="detalheLocalBackup" placeholder="Detalhamento da localização e gestão institucional das cópias de backup..." onChange={handleChange} className="w-full border p-2 rounded mb-6 mt-2 outline-none focus:border-blue-500" rows="2" required></textarea>
        )}

        {/* Espaço, Prioridade e Ampliação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Espaço utilizado</label>
              <TooltipInfo texto="Informe o volume total dos arquivos do núcleo (utilize estimativas caso não tenha o número exato)." />
            </div>
            <div className="flex">
              <input type="number" name="espacoArmazenamentoValor" onChange={handleChange} className="w-2/3 border p-2 rounded-l outline-none focus:border-blue-500" placeholder="Ex: 500" />
              <select name="espacoArmazenamentoUnidade" onChange={handleChange} className="w-1/3 border p-2 rounded-r bg-gray-100 outline-none focus:border-blue-500">
                <option value="MB">MB</option>
                <option value="GB">GB</option>
                <option value="TB">TB</option>
              </select>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Prioridade de preservação*</label>
              <TooltipInfo texto="Avalie a urgência de tratamento e preservação definitiva para o acervo em questão." />
            </div>
            <select name="prioridadePreservacao" onChange={handleChange} className="w-full border p-2 rounded outline-none focus:border-blue-500" required>
              <option value="">Selecione</option>
              {['Muito Alta', 'Alta', 'Média', 'Baixa', 'Sem prioridade definida', 'Ainda não avaliada'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className="block font-semibold">Necessidade de ampliação*</label>
              <TooltipInfo texto="Informe se a capacidade atual de armazenamento atende às atividades do núcleo." />
            </div>
            <select name="necessidadeAmpliacao" onChange={handleChange} className="w-full border p-2 rounded outline-none focus:border-blue-500" required>
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