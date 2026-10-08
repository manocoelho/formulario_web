import React, { useState, useEffect } from 'react';
import { Trash2, Edit, X } from 'lucide-react';

export default function GerenciarAcessos() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nome: '', login: '', senha: '', perfil: 'pesquisador' });
  const [editandoId, setEditandoId] = useState(null);

  const carregarUsuarios = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios`);
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
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
    
    const url = editandoId 
      ? `${import.meta.env.VITE_API_URL}/api/usuarios/${editandoId}`
      : `${import.meta.env.VITE_API_URL}/api/usuarios`;
    
    const method = editandoId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(`Usuário ${editandoId ? 'atualizado' : 'cadastrado'} com sucesso!`);
        setFormData({ nome: '', login: '', senha: '', perfil: 'pesquisador' });
        setEditandoId(null);
        carregarUsuarios();
      } else {
        alert('Erro ao salvar usuário.');
      }
    } catch (error) {
      alert('Falha na comunicação com o servidor.');
    }
  };

  const handleEdit = (user) => {
    setEditandoId(user.id);
    // Deixamos a senha em branco por segurança. O backend não a atualizará se estiver vazia.
    setFormData({ nome: user.nome, login: user.login, senha: '', perfil: user.perfil });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({ nome: '', login: '', senha: '', perfil: 'pesquisador' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário permanentemente?')) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        carregarUsuarios();
      } else {
        alert('Erro ao excluir usuário.');
      }
    } catch (error) {
      alert('Falha na comunicação com o servidor.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Gerenciar Acessos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Painel de Formulário */}
        <div className="bg-white p-6 rounded-lg shadow border h-fit">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-xl font-bold text-gray-800">
              {editandoId ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>
            {editandoId && (
              <button onClick={cancelarEdicao} className="text-gray-400 hover:text-red-500 transition-colors" title="Cancelar Edição">
                <X size={24} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Nome Completo</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full border p-2 rounded focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Login (Nome de usuário)</label>
              <input type="text" name="login" value={formData.login} onChange={handleChange} required className="w-full border p-2 rounded focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Senha {editandoId && <span className="text-gray-400 font-normal text-xs">(Deixe em branco para manter a atual)</span>}
              </label>
              {/* O campo de senha só é obrigatório se for um Novo Usuário */}
              <input type="password" name="senha" value={formData.senha} onChange={handleChange} required={!editandoId} className="w-full border p-2 rounded focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Perfil de Acesso</label>
              <select name="perfil" value={formData.perfil} onChange={handleChange} className="w-full border p-2 rounded focus:border-blue-500 outline-none">
                <option value="pesquisador">Pesquisador</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className={`w-full text-white font-bold py-3 rounded transition-colors shadow-sm ${editandoId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-700 hover:bg-blue-800'}`}>
              {editandoId ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
            </button>
          </form>
        </div>

        {/* Tabela de Usuários */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow border overflow-hidden">
          <div className="bg-gray-50 p-4 border-b">
            <h2 className="text-lg font-bold text-gray-800">Usuários Ativos no Sistema</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 border-b">Nome</th>
                  <th className="p-4 border-b">Login</th>
                  <th className="p-4 border-b">Perfil</th>
                  <th className="p-4 border-b text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length > 0 ? (
                  usuarios.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-gray-900">{user.nome}</td>
                      <td className="p-4 text-sm text-gray-600">{user.login}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.perfil === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                          {user.perfil}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-center">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-900 transition-colors" title="Editar Usuário">
                            <Edit size={20} />
                          </button>
                          <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Excluir Usuário">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">
                      Nenhum usuário cadastrado.
                    </td>
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