import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart2, Download, Users, LogOut } from 'lucide-react';

export default function LayoutAdmin({ usuario, setUsuario }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUsuario(null);
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', label: 'Início', icon: <Home size={20} /> },
    { path: '/admin/formulario', label: 'Formulário', icon: <FileText size={20} /> },
    { path: '/admin/dashboard', label: 'Dashboard', icon: <BarChart2 size={20} /> },
    { path: '/admin/exportar', label: 'Exportar Dados', icon: <Download size={20} /> },
    { path: '/admin/acessos', label: 'Gerenciar Acessos', icon: <Users size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 border-b border-blue-800">
          <h1 className="text-2xl font-bold tracking-wider">FCJA Admin</h1>
          <p className="text-blue-300 text-sm mt-1">Logado como: {usuario?.nome}</p>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-800 font-semibold' : 'hover:bg-blue-800/50 text-blue-100'}`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors">
            <LogOut size={20} /> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}