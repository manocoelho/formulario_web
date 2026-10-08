import React, { useState, useEffect } from 'react';

export default function GerenciarAcessos() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nome: '', login: '', senha: '', perfil: 'pesquisador' });
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const carregarUsuarios = async () => {
    try {
      const res = await fetch('import.meta.env.VITE_API_URL/api/usuarios');
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ texto: '', tipo: '' });
    
    try {
      const response = await fetch('import.meta.env.VITE_API_URL/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMensagem({ texto: 'Usuário cadastrado com sucesso!', tipo: 'sucesso' });
        setFormData({ nome: '', login: '', senha: '', perfil: 'pesquisador' }); // Limpa os campos
        carregarUsuarios(); // Atualiza a tabela na mesma hora
      } else {
        setMensagem({ texto: data.error || 'Erro ao cadastrar.', tipo: 'erro' });
      }
    } catch (error) {
      setMensagem({ texto: 'Falha na conexão com o servidor.', tipo: 'erro' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 border-b pb-4">Gerenciar Acessos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Cadastro */}
        <div className="bg-white p-6 rounded-lg shadow-md border top-0">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Novo Usuário</h2>
          
          {mensagem.texto && (
            <div className={`p-3 mb-4 rounded text-sm font-medium ${mensagem.tipo === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {mensagem.texto}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nome Completo</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full border p-2 rounded outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Login (Nome de usuário)</label>
              <input type="text" name="login" value={formData.login} onChange={handleChange} required className="w-full border p-2 rounded outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Senha</label>
              <input type="password" name="senha" value={formData.senha} onChange={handleChange} required className="w-full border p-2 rounded outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Perfil de Acesso</label>
              <select name="perfil" value={formData.perfil} onChange={handleChange} className="w-full border p-2 rounded bg-white outline-none focus:border-blue-500">
                <option value="pesquisador">Pesquisador</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            
            <button type="submit" className="bg-blue-800 text-white font-bold p-3 rounded mt-2 hover:bg-blue-900 transition-colors">
              Cadastrar Usuário
            </button>
          </form>
        </div>

        {/* Lista de Usuários Cadastrados */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md border overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Usuários Ativos no Sistema</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm">
                  <th className="p-4 border-b">Nome</th>
                  <th className="p-4 border-b">Login</th>
                  <th className="p-4 border-b">Perfil</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 border-b">
                      <td className="p-4 text-sm font-medium text-gray-900">{user.nome}</td>
                      <td className="p-4 text-sm text-gray-600">{user.login}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.perfil === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {user.perfil}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">Nenhum usuário encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}