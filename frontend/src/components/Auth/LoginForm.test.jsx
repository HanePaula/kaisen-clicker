import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { LoginForm } from './LoginForm';

// Teste de Unidade "Smart" precisa apenas interceptar a saída do Context Hook (Ele pensa que o Context tá online)
vi.mock('../../context/AuthContext', () => ({
    useAuth: vi.fn()
}));
import { useAuth } from '../../context/AuthContext';

describe('Smart Component: LoginForm Interactive Data', () => {
    let mockLogin;

    beforeEach(() => {
        mockLogin = vi.fn();
        useAuth.mockReturnValue({ login: mockLogin, loading: false }); // Componente "limpo" p/ start
    });

    it('Intercepta form vazio travando a requisição API repassando Warning vermelho na tela e poupando IO (Validação Sucesso)', () => {
        render(<LoginForm />);
        const btn = screen.getByRole('button', { name: /Começar a Produzir/i });
        
        fireEvent.click(btn); // Tenta submeter nulo
        
        expect(mockLogin).not.toHaveBeenCalled();
        expect(screen.getByRole('alert').textContent).toContain('muito curto');
    });

    it('Libera onSubmit enviando o Username e repassando para o Context Controller com arvore correta (Success Call)', async () => {
        render(<LoginForm />);
        
        // Simulação Realística do ARIA User Agent Typing
        const input = screen.getByLabelText(/Digite seu Apelido/i);
        fireEvent.change(input, { target: { value: 'ToyotaMaster' } }); 
        
        fireEvent.click(screen.getByRole('button', { name: /Começar a Produzir/i }));
        
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('ToyotaMaster');
        });
        expect(screen.queryByRole('alert')).toBeNull(); // Nao explodiu mensagem de preechimento
    });
});
