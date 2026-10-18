import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Info, ShieldCheck, Database, FileText, ArrowRight } from 'lucide-react';

export default function GuiaInicial() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Cabeçalho do Guia */}
      <div className="bg-blue-900 text-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-3 leading-tight">
          <BookOpen size={36} className="shrink-0" />
          Guia de Preenchimento do Diagnóstico dos Acervos e Dados de Pesquisa dos Núcleos da FCJA
        </h1>
        {/* text-justify */}
        <div className="text-blue-100 text-lg space-y-4 mt-6 text-justify">
          <p>
            Este formulário tem como objetivo identificar e caracterizar os documentos e dados consultados, reunidos, digitalizados ou produzidos pelos núcleos do Projeto Preservação da Memória e Difusão Educativa, Cultural e Científica do Acervo da Fundação Casa de José Américo.
          </p>
          <p>
            As informações coletadas subsidiarão a organização arquivística, o acompanhamento da digitalização, a definição de metadados, a identificação de riscos e o planejamento do armazenamento, da preservação e do acesso. Também orientarão a preparação dos objetos digitais para ingresso no Repositório Arquivístico Digital Confiável da FCJA, denominado RDC-Arq.
          </p>
          <p>
            Preencha os campos considerando a situação efetiva do núcleo na data da resposta. Diferencie as fontes utilizadas na pesquisa dos materiais produzidos pela equipe. Quando uma informação ainda não estiver disponível, registre essa condição no campo de detalhamento correspondente.
          </p>
        </div>
      </div>

      {/* text-justify para listas e textos das seções */}
      <div className="space-y-6 text-gray-800 text-justify">
        
        {/* Seção 1 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <Info size={24} /> 1. Dados básicos do núcleo
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Nome do núcleo:</strong> Selecione a denominação oficial do núcleo ao qual pertencem os documentos e dados diagnosticados. Considere o núcleo específico, como acervo audiovisual, imprensa e cultura, patrimônio arqueológico, lugares de consciência, educação patrimonial, sustentabilidade e diversidade ou repositório arquivístico digital confiável.</li>
            <li><strong>Coordenador(a):</strong> Selecione o nome da pessoa responsável pela coordenação do núcleo. Caso o responsável ainda não esteja cadastrado, registre essa informação para atualização.</li>
            <li><strong>Situação do núcleo:</strong> Informe se as atividades estão em andamento ou encerradas. Considere a situação da pesquisa ou da etapa diagnosticada, inclusive quando houver documentos e dados de atividades já concluídas.</li>
            <li><strong>Vigência — início e fim:</strong> Informe as datas de início e término do núcleo ou da etapa de pesquisa abrangida pelo diagnóstico. Utilize os registros institucionais disponíveis. Quando não houver encerramento definido, deixe o campo final em branco, se permitido, e esclareça a situação no detalhamento. Identifique expressamente as datas que forem apenas previsões. A vigência individual da bolsa deve ser distinguida do período de funcionamento do núcleo.</li>
            <li><strong>Escopo:</strong> Descreva o tema, os objetivos e os limites da pesquisa. Identifique os acervos, as coleções, os períodos históricos e os espaços estudados, conforme o caso. Podem ser mencionados, por exemplo, as coleções audiovisuais, as revistas Ilustração e Manaíra, os sítios arqueológicos, os lugares de memória e consciência, os documentos sobre educação patrimonial ou os registros relacionados à Mata da Falésia de Cabo Branco.</li>
            <li><strong>Atividades desenvolvidas:</strong> Informe as principais ações realizadas ou em execução, como pesquisa documental, organização de acervos, catalogação, digitalização, entrevistas, transcrição, registro fotográfico, pesquisa de campo, georreferenciamento, elaboração de mapas, produção de materiais educativos e preparação de arquivos para preservação e acesso. Quando pertinente, indique o estágio da digitalização e da descrição dos documentos.</li>
          </ul>
        </section>

        {/* Seção 2 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <FileText size={24} /> 2. Procedência e documentos originais
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Procedência da documentação/dados:</strong> Assinale como os documentos e dados foram obtidos ou constituídos: consulta ao acervo da FCJA, doação, aquisição, reprodução autorizada, pesquisa em outras instituições, consulta a fontes disponíveis na internet, entrevistas, pesquisa de campo ou produção da própria equipe. Marque todas as alternativas aplicáveis.</li>
            <li><strong>Detalhamento da procedência — opcional:</strong> Identifique as instituições, os fundos, as coleções, os produtores ou as fontes de onde os documentos e dados se originam. Quando disponíveis, informe referências, códigos de identificação, endereços eletrônicos e datas de coleta. Esses registros devem permitir recuperar a fonte e compreender o contexto de obtenção do material.</li>
            <li><strong>Existência de documentos originais:</strong> Informe se os documentos utilizados possuem originais identificados e onde estão sob guarda. Considere tanto documentos em suporte físico quanto documentos originalmente produzidos em ambiente digital. Indique se estão na FCJA, em outra instituição, com particulares, dispersos ou com localização desconhecida.</li>
            <li><strong>Especificação sobre originais — opcional:</strong> Detalhe a instituição ou pessoa responsável pela guarda, a localização, o suporte e as condições de conservação ou acesso conhecidas. Quando o núcleo trabalhar com reproduções, registre sua relação com os originais. Para documentos digitais, informe, quando possível, onde se encontra a versão de referência.</li>
          </ul>
        </section>

        {/* Seção 3 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <Database size={24} /> 3. Gêneros documentais e tipos de dados
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Gênero dos documentos:</strong> Assinale os gêneros presentes no conjunto: textual, como correspondências, relatórios e periódicos; iconográfico, como fotografias e desenhos; sonoro, como entrevistas e gravações de áudio; filmográfico, como filmes e vídeos; cartográfico, como mapas e plantas; ou tridimensional, quando aplicável. Um mesmo núcleo pode reunir documentos de diferentes gêneros.</li>
            <li><strong>Outro gênero documental:</strong> Preencha quando houver material que não esteja contemplado nas alternativas. Descreva suas características para permitir a análise pela equipe responsável pelo diagnóstico.</li>
            <li><strong>Outros tipos de dados coletados:</strong> Selecione os tipos de dados utilizados na pesquisa, como depoimentos, registros de campo, informações estatísticas, dados de georreferenciamento, levantamentos bibliográficos, cadastros, bases de dados ou códigos de programação. Considere os materiais efetivamente reunidos ou utilizados pelo núcleo.</li>
            <li><strong>Detalhe a utilização — opcional:</strong> Explique como esses dados são organizados e empregados nas atividades. Informe, quando pertinente, os programas necessários para consultá-los, a estrutura de pastas, os critérios de nomeação dos arquivos, os instrumentos de descrição e os metadados já existentes. Registre também relações que precisem ser preservadas, como a associação entre uma entrevista e sua transcrição ou entre uma fotografia e sua localização no mapa.</li>
          </ul>
        </section>

        {/* Seção 4 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <ShieldCheck size={24} /> 4. Produção, formatos, direitos e questões éticas
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Dados produzidos pelo núcleo:</strong> Assinale os materiais gerados pela equipe, como relatórios, inventários, catálogos, planilhas, bancos de dados, fotografias, gravações, transcrições, mapas, textos científicos, materiais educativos e conteúdos de exposições. Inclua as reproduções digitais produzidas pelo núcleo, identificando-as como resultado da digitalização de documentos preexistentes.</li>
            <li><strong>Formatos dos objetos digitais:</strong> Informe as extensões dos arquivos existentes, separadas por vírgula, como .pdf, .docx, .csv, .xlsx, .tif, .jpg, .wav, .mp4, .shp, .geojson ou .kml. Registre os formatos efetivamente utilizados. Quando houver versões diferentes do mesmo material, identifique quais são destinadas à preservação, ao trabalho da equipe e à divulgação.</li>
            <li><strong>Existência de dados pessoais:</strong> Informe se o conjunto contém informações que permitem identificar pessoas, como nomes, contatos, imagens, vozes ou informações presentes em entrevistas e documentos pessoais. Considere também os dados existentes nos registros descritivos e nas planilhas. Caso a identificação ainda não tenha sido avaliada, utilize a alternativa correspondente.</li>
            <li><strong>Dados sensíveis:</strong> Informe se há dados pessoais relacionados, por exemplo, à origem racial ou étnica, à convicção religiosa ou à saúde. Examine especialmente entrevistas, testemunhos e documentos que possam expor pessoas ou grupos. Quando houver dúvida, sinalize a necessidade de análise.</li>
            <li><strong>Medidas adotadas para questões éticas:</strong> Assinale os procedimentos efetivamente adotados, como consentimento dos participantes, Termo de Consentimento Livre e Esclarecido — TCLE, autorização de uso de imagem e voz, anonimização e restrição de acesso. Considere as características da pesquisa e dos materiais envolvidos.</li>
            <li><strong>Outra medida:</strong> Descreva procedimentos específicos que não estejam contemplados nas alternativas, incluindo acordos com participantes, comunidades ou instituições e cuidados relativos à divulgação de testemunhos, imagens ou informações de localização.</li>
            <li><strong>Titularidade dos direitos:</strong> Informe os titulares conhecidos dos direitos autorais sobre as obras e os materiais que integram o conjunto, como autores, fotógrafos, entrevistadores, produtores audiovisuais ou instituições. Registre as autorizações e licenças existentes e sinalize os casos cuja titularidade ainda precisa ser esclarecida.</li>
            <li><strong>Detalhamento da titularidade — opcional:</strong> Especifique situações de autoria compartilhada, cessão de direitos, licenciamento ou autorização de reprodução e divulgação. Identifique os documentos que comprovam essas condições e eventuais limites de uso. Quando necessário, diferencie os direitos relacionados ao documento original daqueles relativos aos materiais produzidos pelo núcleo.</li>
          </ul>
        </section>

        {/* Seção 5 */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2 flex items-center gap-2">
            <Database size={24} /> 5. Armazenamento, segurança, cópias de segurança e preservação
          </h2>
          <ul className="space-y-3 list-disc pl-5">
            <li><strong>Local de armazenamento:</strong> Assinale onde os arquivos digitais estão armazenados atualmente, como computador institucional, computador pessoal, servidor, serviço de nuvem, HD externo ou outro dispositivo. Indique todos os locais utilizados e, no detalhamento, identifique onde se encontra a versão principal do conjunto.</li>
            <li><strong>Outro local:</strong> Quando essa opção for selecionada, especifique o dispositivo, serviço ou ambiente utilizado. Informe dados suficientes para sua identificação, sem registrar senhas ou credenciais de acesso.</li>
            <li><strong>Responsável pelo armazenamento:</strong> Selecione a pessoa, equipe ou unidade que administra o armazenamento e acompanha a organização e a integridade dos arquivos. Caso existam responsabilidades compartilhadas, descreva a participação de cada responsável no detalhamento.</li>
            <li><strong>Condição de acesso aos dados:</strong> Informe se o acesso é aberto, restrito à equipe, condicionado à autorização ou submetido a outra condição. Considere eventuais diferenças entre os conjuntos documentais e entre as versões destinadas à preservação e à divulgação. Registre restrições associadas aos participantes, aos direitos de uso ou à proteção dos bens culturais estudados.</li>
            <li><strong>Controle de acesso e segurança:</strong> Assinale as medidas existentes, como autenticação por senha, permissões por usuário, restrição de rede ou registro de acessos. Quando houver outras medidas, descreva-as no campo correspondente. Informe os controles efetivamente utilizados.</li>
            <li><strong>Realiza backup? — sim/não:</strong> Indique se são mantidas cópias de segurança dos arquivos que possam ser utilizadas para recuperação em caso de perda, exclusão ou falha. Quando o procedimento depender de outra equipe ou instituição, confirme a informação com o responsável.</li>
            <li><strong>Periodicidade do backup:</strong> Informe a frequência real de realização das cópias, como diária, semanal, mensal ou eventual. Quando possível, registre no detalhamento a data da última cópia e a existência de verificação ou teste de recuperação.</li>
            <li><strong>Local do backup:</strong> Assinale onde as cópias de segurança são mantidas. Identifique o serviço, servidor, dispositivo ou instituição responsável e esclareça sua localização em relação ao armazenamento principal.</li>
            <li><strong>Espaço utilizado:</strong> Informe o volume total dos arquivos abrangidos pelo diagnóstico e selecione a unidade correspondente: MB, GB ou TB. Sempre que possível, utilize a medição fornecida pelo sistema de armazenamento. Esclareça se o valor inclui cópias repetidas, versões de trabalho e arquivos destinados à divulgação. Se for uma estimativa, identifique-a como tal.</li>
            <li><strong>Necessidade de ampliação:</strong> Informe se a capacidade atual de armazenamento atende às atividades do núcleo. Considere o volume existente e o crescimento esperado com novas digitalizações, entrevistas, registros audiovisuais, mapas e demais produtos. Quando possível, estime a capacidade adicional necessária.</li>
          </ul>
        </section>

        {/* Rodapé / Conclusão do Guia */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-blue-900">
          <p className="font-medium text-justify">
            Antes de concluir, confira se as respostas permitem identificar a origem dos documentos, os responsáveis, os formatos, a localização dos arquivos, as condições de acesso e as necessidades de organização e preservação. Essas informações orientarão o trabalho conjunto dos núcleos com a equipe do RDC-Arq, especialmente na definição de metadados e na preparação dos objetos digitais para preservação e acesso.
          </p>
        </div>

        {/* Botão de Navegação para o Formulário */}
        <div className="pt-4 pb-8 flex justify-center">
          <Link 
            to="formulario" 
            className="flex items-center gap-3 bg-blue-700 text-white text-lg px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-colors shadow-md"
          >
            Seguir para o formulário <ArrowRight size={24} />
          </Link>
        </div>

      </div>
    </div>
  );
}