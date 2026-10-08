import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Cores padronizadas para os gráficos
  const CORES = ['#1e3a8a', '#3b82f6', '#93c5fd', '#bfdbfe', '#f87171'];

  useEffect(() => {
    fetch('import.meta.env.VITE_API_URL/api/formularios')
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setCarregando(false);
      })
      .catch(err => {
        console.error("Erro ao buscar dados do dashboard:", err);
        setCarregando(false);
      });
  }, []);

  if (carregando) return <div className="p-8 text-center text-gray-500">Carregando métricas...</div>;
  if (dados.length === 0) return <div className="p-8 text-center text-gray-500">Nenhum diagnóstico preenchido ainda.</div>;

  // --- PROCESSAMENTO DOS DADOS PARA OS GRÁFICOS ---
  
  // 1. Gráfico de Situação dos Núcleos
  const situacaoCount = dados.reduce((acc, form) => {
    acc[form.situacao] = (acc[form.situacao] || 0) + 1;
    return acc;
  }, {});
  const dadosSituacao = Object.keys(situacaoCount).map(key => ({ name: key, value: situacaoCount[key] }));

  // 2. Gráfico de Realização de Backup
  const backupCount = dados.reduce((acc, form) => {
    const status = form.realiza_backup || 'Não informado';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});
  const dadosBackup = Object.keys(backupCount).map(key => ({ name: key, total: backupCount[key] }));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-blue-900">Dashboard de Diagnóstico</h1>
      <p className="text-gray-600 mb-8 pb-4 border-b">Visão geral dos dados de pesquisa da FCJA</p>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-800">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total de Diagnósticos</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{dados.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Núcleos em Atividade</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{situacaoCount['Em atividade'] || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Núcleos Encerrados</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{situacaoCount['Encerrado'] || 0}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Pizza */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Situação dos Núcleos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dadosSituacao} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                  {dadosSituacao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Realização de Backup</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosBackup}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}