import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

export default function LayoutPesquisador({ usuario, setUsuario }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuario(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra Superior estilo OpenAI */}
      <header className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="font-bold text-xl text-blue-900 tracking-tight">FCJA Docs</h1>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link to="/pesquisador" className="hover:text-black transition-colors">Início (Guia)</Link>
            <Link to="/pesquisador/formulario" className="hover:text-black transition-colors">Formulário</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500">Logado como <strong className="text-gray-900">{usuario?.nome}</strong></span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors font-medium">
            Sair <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Onde o conteúdo das páginas será renderizado */}
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}