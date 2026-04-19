import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

/**
 * Smart Component: Lida com Input States e lida com requests no provedor global de Autenticação.
 */
export const LoginForm = () => {
    const { login, loading } = useAuth();
    
    // Estados restritos de manipulação local da View (UI Tracking)
    const [username, setUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(''); // Reseta UI alert
        
        // Validação Frontend rápida
        if (!username || username.trim().length < 3) {
            setErrorMsg('Nome muito curto (mínimo de 3 letras).');
            return;
        }
        
        try {
            await login(username);
        } catch (err) {
            setErrorMsg(err.message || 'Falha de comunicação na rede interna. Verifique a API.');
        }
    };

    return (
        <form onSubmit={handleSubmit} aria-label="Formulário de Acesso">
            <h2>Registro de Engenheiro</h2>
            
            {/* Tratamentos Semânticos Visuais */}
            {errorMsg && <div role="alert" className="error-box wine-text">{errorMsg}</div>}
            
            <div className="input-group">
                <label htmlFor="username">Digite seu Apelido:</label>
                <input 
                    id="username"
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: ScrumMaster99"
                />
            </div>

            <Button type="submit" disabled={loading} variant="primary">
                {loading ? 'Acessando Rede...' : 'Começar a Produzir'}
            </Button>
        </form>
    );
};
