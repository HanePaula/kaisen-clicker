import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginForm } from '../components/Auth/LoginForm';

export const Home = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="loading-screen text-wine">Carregando painel Mestre...</div>;
    }

    // Se estivermos engatados no LocalStorage a página principal joga direto pro jogo (rota fechada)
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <main className="auth-page">
            <div>
                <header className="hero-section" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: 'var(--accent-wine)', fontSize: '2.5rem', fontWeight: 800 }}>Kaizen Clicker</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Domine a linha de produção e lidere o Ranking eKaizen.</p>
                </header>
                <LoginForm />
            </div>
        </main>
    );
};
