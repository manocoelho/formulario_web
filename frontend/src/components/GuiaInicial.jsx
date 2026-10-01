import React from 'react';
import { BookOpen, Info, ShieldCheck, Database, FileText } from 'lucide-react';

export default function GuiaInicial() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Cabeçalho do Guia */}
      <div className="bg-blue-900 text-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <BookOpen size={32} />
          Guia de Preenchimento do Diagnóstico
        </h1>
        <p className="text-blue-100 text-lg">
          Bem-vindo(a) ao sistema de gestão de dados da Fundação Casa de José Américo (FCJA). 
          Este formulário tem como objetivo mapear e diagnosticar a documentação e os dados de pesquisa dos nossos núcleos. 
          Siga as instruções abaixo para preencher cada campo corretamente.
        </p>
      </div>

      <div className="space-y-6 text-gray-800">
        
        {/* Seção 1 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <Info size={24} /> 1. Dados básicos do núcleo
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Nome do núcleo:</strong> Selecione na lista suspensa o projeto de pesquisa ao qual os dados pertencem.</li>
            <li><strong>Coordenador(a):</strong> Selecione o nome do(a) coordenador(a) responsável pelo núcleo escolhido.</li>
            <li><strong>Situação do núcleo:</strong> Indique se o projeto está atualmente "Em atividade" (pesquisa em curso) ou "Encerrado" (concluído).</li>
            <li><strong>Vigência (Início e Fim):</strong> Selecione no calendário as datas de início e término do projeto. Caso seja um projeto contínuo, deixe a data de fim em branco ou insira uma previsão.</li>
            <li><strong>Escopo:</strong> Descreva brevemente o tema principal, objetivo geral e a abrangência da pesquisa do núcleo.</li>
            <li><strong>Atividades desenvolvidas:</strong> Liste as principais ações realizadas (ex: coleta de campo, análise de acervo documental, entrevistas, etc.).</li>
          </ul>
        </section>

        {/* Seção 2 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <FileText size={24} /> 2. Procedência e Originais
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Procedência da documentação/dados:</strong> Marque todas as opções que explicam como os dados chegaram ao núcleo (ex: Doação, Aquisição, Internet, etc.).</li>
            <li><strong>Detalhamento da procedência (Opcional):</strong> Use a caixa de texto para dar contexto extra caso tenha marcado opções que exijam explicação (como "Outra procedência").</li>
            <li><strong>Existência de documentos originais:</strong> Indique o paradeiro físico dos documentos primários usados na pesquisa (ex: Estão na FCJA, Dispersos, etc.).</li>
            <li><strong>Especificação sobre originais (Opcional):</strong> Detalhe o estado ou a localização específica dos originais, caso necessário.</li>
          </ul>
        </section>

        {/* Seção 3 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <Database size={24} /> 3. Gênero e Tipos de Dados
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Gênero dos documentos:</strong> Assinale as categorias da documentação (Textual, Iconográfico como fotos/imagens, Sonoros, Filmográfico, Cartográfico, Tridimensional).</li>
            <li><strong>Outro gênero documental:</strong> Preencha apenas se houver algum documento que não se encaixe nas categorias acima.</li>
            <li><strong>Outros tipos de dados coletados:</strong> Selecione os formatos dos dados brutos reunidos pela pesquisa (Entrevistas, Estatísticas, Algoritmos, etc.).</li>
            <li><strong>Detalhe a utilização (Opcional):</strong> Explique como o núcleo aplica e trabalha com os dados selecionados na opção anterior.</li>
          </ul>
        </section>

        {/* Seção 4 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <ShieldCheck size={24} /> 4. Produção, Formatos e Ética
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Dados produzidos pelo núcleo:</strong> Marque o que o próprio núcleo criou a partir da pesquisa (Relatórios, Vídeos, Transcrições, etc.).</li>
            <li><strong>Formatos dos objetos digitais:</strong> Digite as extensões dos arquivos utilizados, separados por vírgula (Ex: .pdf, .docx, .mp4, .jpg).</li>
            <li><strong>Existência de dados pessoais:</strong> Indique se os dados contêm informações que identificam pessoas (Sim, Não, Em análise, etc.).</li>
            <li><strong>Dados sensíveis:</strong> Responda se há dados pessoais que revelem origem racial, convicção religiosa, saúde, etc. (Sim, Não, Em análise, etc.).</li>
            <li><strong>Medidas adotadas para questões éticas:</strong> Marque os procedimentos legais/éticos adotados (Consentimento, Anonimização, TCLE, etc.).</li>
            <li><strong>Outra medida:</strong> Descreva se houver alguma medida ética específica que não estava na lista.</li>
            <li><strong>Titularidade dos direitos:</strong> Indique quem possui os direitos de propriedade intelectual/autoral sobre os dados coletados (FCJA, Autor original, Compartilhada, etc.).</li>
            <li><strong>Detalhamento da titularidade (Opcional):</strong> Use caso a titularidade seja complexa ou partilhada com outras instituições.</li>
          </ul>
        </section>

        {/* Seção 5 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <Database size={24} /> 5. Armazenamento, segurança e backup
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Local de armazenamento:</strong> Marque onde os ficheiros estão fisicamente guardados hoje (Nuvem, Computador institucional, HD Externo, etc.).</li>
            <li><strong>Caixa "Outro local":</strong> Aparecerá apenas se marcar a opção "Outro Local". Especifique qual.</li>
            <li><strong>Responsável pelo armazenamento:</strong> Selecione na lista quem cuida da integridade destes ficheiros (TI, Pesquisador, Biblioteca, etc.). Se escolher "Outro responsável", digite o cargo na caixa que irá aparecer.</li>
            <li><strong>Condição de acesso aos dados:</strong> Defina quem pode consultar estes dados (Aberto, Restrito, Mediante autorização, etc.).</li>
            <li><strong>Controle de acesso e segurança:</strong> Marque as barreiras de proteção existentes (Senhas, Restrição de IP, etc.). Caso escolha "Outra medida", detalhe na caixa que aparecerá.</li>
            <li><strong>Realiza backup? (Sim/Não):</strong> Indique se o núcleo faz cópias de segurança do acervo.</li>
            <li><strong>Periodicidade do backup:</strong> Se sim, indique de quanto em quanto tempo a cópia é feita (Diário, Semanal, etc.).</li>
            <li><strong>Local do Backup:</strong> Marque para onde a cópia de segurança é enviada (Nuvem, Servidor externo, etc.). Caso seja uma instituição parceira ou local físico alternativo, justifique na caixa de detalhamento que surgirá.</li>
            <li><strong>Espaço utilizado:</strong> Digite um número e escolha a unidade (MB, GB ou TB) correspondente ao "peso" total dos ficheiros da pesquisa.</li>
            <li><strong>Prioridade de preservação:</strong> Avalie a urgência/importância de arquivar estes dados de forma definitiva (Muito alta a Baixa).</li>
            <li><strong>Necessidade de ampliação:</strong> Indique se o núcleo precisa de mais espaço de armazenamento atualmente (Sim, Não, Em análise, etc.).</li>
          </ul>
        </section>

      </div>
    </div>
  );
}