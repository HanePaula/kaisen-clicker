import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';
import { PlayerService } from '../services/playerService';

vi.mock('../services/playerService', () => ({
    PlayerService: {
        create: vi.fn()
    }
}));

const TestComponent = () => {
    const { user, login, logout, isAuthenticated } = useAuth();
    return (
        <div>
            <div data-testid="status">{isAuthenticated ? 'LOGADO' : 'VISITANTE'}</div>
            <div data-testid="user">{user?.username}</div>
            <button onClick={() => login('TesterProfile')}>Log in</button>
            <button onClick={logout}>Sign out</button>
        </div>
    );
};

describe('AuthContext Orientação Comportamental Cega', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('deve carregar deslogado e transitar as variaveis instanciando re-render via state mutations virtuais visualmente sem espiar LocalStorage', async () => {
        PlayerService.create.mockResolvedValueOnce({ id: 'uuid123', username: 'TesterProfile' });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(screen.getByTestId('status').textContent).toBe('VISITANTE');
        
        fireEvent.click(screen.getByText('Log in')); 

        // Ignora implementação física (Onde ele guardou Cache); o que importa é Comportamento de Tela React para o Usuário
        await waitFor(() => {
            expect(screen.getByTestId('status').textContent).toBe('LOGADO');
            expect(screen.getByTestId('user').textContent).toBe('TesterProfile');
        });
    });
});
