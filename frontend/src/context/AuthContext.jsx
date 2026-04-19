import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlayerService } from '../services/playerService';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initializer: Monta o Cache persistente se ele recarregar a pagina web
    useEffect(() => {
        const token = localStorage.getItem('@KaizenToken');
        const savedUser = localStorage.getItem('@KaizenUser');
        
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username) => {
        try {
            setLoading(true);
            
            // Consome o service de rede que criamos para persistir perfil no BackEnd
            const newPlayer = await PlayerService.create({ username });
            
            // Em caso de Login forte, aqui teríamos recebido um JWT do nosso Controller auth
            const staticJwtMock = `local-jwt-for-${newPlayer.id}`; 
            
            localStorage.setItem('@KaizenToken', staticJwtMock);
            localStorage.setItem('@KaizenUser', JSON.stringify(newPlayer));
            
            setUser(newPlayer);
        } catch (error) {
            console.error('Falha de Login:', error);
            throw error; // Propaga falha pra tela e toast avisar o form
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('@KaizenToken');
        localStorage.removeItem('@KaizenUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout, 
            isAuthenticated: !!user 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook de consumo
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context || Object.keys(context).length === 0) {
        throw new Error('useAuth deve ser consumido debaixo do "wrap" de um <AuthProvider>');
    }
    return context;
};
