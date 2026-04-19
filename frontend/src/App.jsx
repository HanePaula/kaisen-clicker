import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Importação das Páginas
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Leaderboard } from './pages/Leaderboard';

import './index.css'; // Estilos base de cores que faremos amarrados 

/**
 * Higher Order Component protetor: Pega os filhos englobados por ele (<PrivateRoute><Filhos/></PrivateRoute>) 
 * e avalia se o AppContext local aprovou login, do contrário chuta de volta de onde vieram
 */
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Se a máquina estiver demorando a checar os tokens no storage do browser, aguarda renderização pesada
    if (loading) return <div className="text-wine">Checando credenciais locais...</div>;
    
    // Proibido acessar URL na marra sem estar setado no Cache
    if (!isAuthenticated) return <Navigate to="/" replace />;
    
    return children;
};

// Estrutura de Rotas
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rota Publica: Landing Page / Painel de Login e Intro */}
                <Route path="/" element={<Home />} />
                
                {/* Rota Privada: Exclusiva para visualização do Jogo logado */}
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
                
                {/* Visualização de Tabelas de Líderes Global Segura Dinamica */}
                <Route 
                    path="/ranking" 
                    element={
                        <PrivateRoute>
                            <Leaderboard />
                        </PrivateRoute>
                    } 
                />
                
                {/* Fallback 404 Dinâmico: Se digitar /abobrinhas ou páginas mortas, devolve pro Login silentemente */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

/**
 * Root Application 
 * Observe que apenas injetamos AuthProvider abraçando toda a aplicação. 
 * O GameProvider foi isolado propositalmente apenas para dentro do Componente Dashboard para não afetar perfomance
 */
export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}
