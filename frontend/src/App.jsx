import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LayoutPesquisador from './layouts/LayoutPesquisador';
import LayoutAdmin from './layouts/LayoutAdmin';
import FormularioPesquisa from './components/FormularioPesquisa';
import Login from './components/Login';
import GerenciarAcessos from './components/GerenciarAcessos';
import Dashboard from './components/Dashboard';
import Exportacao from './components/Exportacao';
import GuiaInicial from './components/GuiaInicial';

export default function App() {
  const [usuario, setUsuario] = useState(null);

  // Proteção de rotas simples
  const RequerAutenticacao = ({ children, perfilPermitido }) => {
    if (!usuario) return <Navigate to="/" />;
    if (perfilPermitido && usuario.perfil !== perfilPermitido) return <Navigate to="/" />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública (Login) */}
        {/* Rota Pública (Login Real) */}
        <Route path="/" element={!usuario ? <Login setUsuario={setUsuario} /> : <Navigate to={usuario.perfil === 'admin' ? '/admin' : '/pesquisador'} />} />

        {/* Rotas do Pesquisador (Barra Superior) */}
        <Route path="/pesquisador" element={
          <RequerAutenticacao perfilPermitido="pesquisador">
            <LayoutPesquisador usuario={usuario} setUsuario={setUsuario} />
          </RequerAutenticacao>
        }>
          <Route index element={<GuiaInicial />} />
          <Route path="formulario" element={<FormularioPesquisa />} />
        </Route>

        {/* Rotas do Admin (Barra Lateral) */}
        <Route path="/admin" element={
          <RequerAutenticacao perfilPermitido="admin">
            <LayoutAdmin usuario={usuario} setUsuario={setUsuario} />
          </RequerAutenticacao>
        }>
          <Route index element={<GuiaInicial />} />
          <Route path="formulario" element={<FormularioPesquisa />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="exportar" element={<Exportacao />} />
          <Route path="acessos" element={<GerenciarAcessos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}