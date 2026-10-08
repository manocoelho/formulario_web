import React, { useState } from 'react';

export default function Login({ setUsuario }) {
    const [credenciais, setCredenciais] = useState({ login: '', senha: '' });
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('import.meta.env.VITE_API_URL/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credenciais)
            });

            if (res.ok) {
                const data = await res.json();
                setUsuario(data);
            } else {
                setErro('Login ou senha incorretos.');
            }
        } catch {
            setErro('Falha na conexão. Verifique se o servidor está rodando.');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 border-t-4 border-blue-900">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-900 tracking-tight">
                    FCJA Docs
                </h2>
                {erro && <p className="text-red-600 mb-4 text-sm text-center font-medium bg-red-50 p-2 rounded">{erro}</p>}
                
                <label className="block text-sm font-semibold mb-1 text-gray-700">Usuário</label>
                <input type="text" required className="w-full border p-2 mb-4 rounded focus:ring-2 focus:ring-blue-900 outline-none" 
                    onChange={e => setCredenciais({...credenciais, login: e.target.value})} />
                
                <label className="block text-sm font-semibold mb-1 text-gray-700">Senha</label>
                <input type="password" required className="w-full border p-2 mb-6 rounded focus:ring-2 focus:ring-blue-900 outline-none" 
                    onChange={e => setCredenciais({...credenciais, senha: e.target.value})} />
                
                <button type="submit" className="w-full bg-blue-800 text-white p-2 rounded hover:bg-blue-900 font-bold transition-colors">
                    Entrar no Sistema
                </button>
            </form>
        </div>
    );
}