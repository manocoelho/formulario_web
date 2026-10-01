import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, FileText, Download } from 'lucide-react';

export default function Exportacao() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/formularios')
      .then(res => res.json())
      .then(data => {
        const dadosFormatados = data.map(item => {
          const formatado = { ...item };
          Object.keys(formatado).forEach(key => {
            if (Array.isArray(formatado[key])) {
              formatado[key] = formatado[key].join(', ');
            } else if (typeof formatado[key] === 'object' && formatado[key] !== null) {
              formatado[key] = JSON.stringify(formatado[key]);
            }
          });
          return formatado;
        });
        setDados(dadosFormatados);
        setCarregando(false);
      })
      .catch(err => {
        console.error("Erro ao buscar dados para exportação:", err);
        setCarregando(false);
      });
  }, []);

  const exportToExcel = () => {
    if (dados.length === 0) return alert('Nenhum dado para exportar.');
    
    const worksheet = XLSX.utils.json_to_sheet(dados);
    
    // Calcula a largura adequada para cada coluna baseada no tamanho do texto
    const colunas = Object.keys(dados[0]);
    const wscols = colunas.map(col => {
      const tamanhoMaximo = Math.max(
        col.length,
        ...dados.map(row => {
          const valor = row[col];
          return valor ? String(valor).length : 0;
        })
      );
      // Define a largura máxima de 50 caracteres para não criar colunas infinitas
      return { wch: Math.min(tamanhoMaximo + 2, 50) };
    });
    
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Diagnósticos");
    XLSX.writeFile(workbook, 'fcja_diagnosticos_pesquisa.xlsx');
  };

  const exportToCSV = () => {
    if (dados.length === 0) return alert('Nenhum dado para exportar.');
    
    // Alterado o separador de vírgula para ponto e vírgula (padrão do Excel em PT)
    const separador = ';';
    const cabecalhos = Object.keys(dados[0]).join(separador);
    
    const linhas = dados.map(row => 
      Object.values(row).map(val => {
        // Trata textos nulos e escapa aspas duplas de forma segura
        const texto = String(val || '').replace(/"/g, '""');
        // Envolve todos os valores em aspas para garantir que textos com parágrafos não quebrem o ficheiro
        return `"${texto}"`;
      }).join(separador)
    ).join('\n');
    
    const csvContent = cabecalhos + '\n' + linhas;
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fcja_diagnosticos_pesquisa.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (carregando) return <div className="p-8 text-center text-gray-500">A carregar base de dados...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-blue-900">Exportação de Dados</h1>
      <p className="text-gray-600 mb-8 pb-4 border-b">Descarregue a base de dados completa do diagnóstico para análise externa.</p>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button 
          onClick={exportToExcel}
          className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-bold text-lg transition-colors shadow-sm"
        >
          <FileSpreadsheet size={24} />
          Exportar para Excel (.xlsx)
        </button>
        
        <button 
          onClick={exportToCSV}
          className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-bold text-lg transition-colors shadow-sm"
        >
          <FileText size={24} />
          Exportar para CSV
        </button>
      </div>

      {/* Prévia da Tabela */}
      <div className="bg-white rounded-lg shadow-md border overflow-hidden">
        <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Prévia dos Dados</h2>
          <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full font-semibold">
            {dados.length} registos encontrados
          </span>
        </div>
        
        <div className="overflow-x-auto h-96">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="sticky top-0 bg-gray-100 shadow-sm">
              <tr className="text-gray-600 text-sm">
                <th className="p-4 border-b font-semibold">ID</th>
                <th className="p-4 border-b font-semibold">Núcleo</th>
                <th className="p-4 border-b font-semibold">Coordenador(a)</th>
                <th className="p-4 border-b font-semibold">Situação</th>
                <th className="p-4 border-b font-semibold">Data do Registo</th>
              </tr>
            </thead>
            <tbody>
              {dados.length > 0 ? (
                dados.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 border-b">
                    <td className="p-4 text-sm font-medium text-gray-900">#{row.id}</td>
                    <td className="p-4 text-sm text-gray-600">{row.nucleo_nome || 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-600">{row.coordenador_selecionado}</td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.situacao === 'Em atividade' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {row.situacao}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(row.criado_em).toLocaleDateString('pt-PT')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    A base de dados de diagnósticos está vazia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}