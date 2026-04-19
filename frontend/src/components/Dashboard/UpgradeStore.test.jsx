import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { UpgradeStore } from './UpgradeStore';

vi.mock('../../context/GameContext', () => ({
    useGame: vi.fn()
}));
import { useGame } from '../../context/GameContext';

describe('Smart Component: Store de Variáveis Mecânicas', () => {
    it('deve listar upgrades padraos do DB e passar booleanos pros cards bloqueando o click (Regra Custo/Saldo Pobre)', () => {
        useGame.mockReturnValue({
            factoryState: { points: 10 }, // Dinheiro inicial extremamente baixo de exemplo
            applyUpgrade: vi.fn()
        });

        render(<UpgradeStore />);
        
        expect(screen.getByRole('region', { name: /Loja de Melhorias/i })).toBeDefined();
        
        // Verifica se os QUATRO itens da loja se barraram dinâmicamente de acordo com props recebidas filhas
        const btns = screen.getAllByRole('button');
        expect(btns.length).toBe(4); // Garante que varreu o array base
        expect(btns[0].hasAttribute('disabled')).toBe(true);
        expect(btns[3].hasAttribute('disabled')).toBe(true);
    });

    it('permite o onClick subir do node filho pro ComponentStore ativar Mutation na arvore se Affordable (Compra Rica/Sucesso)', () => {
        const mockSetState = vi.fn();
        useGame.mockReturnValue({
            factoryState: { points: 999999 }, // Jogador riquissimo
            applyUpgrade: mockSetState
        });

        render(<UpgradeStore />);
        
        // Tenta comprar o Metodologia 5S que abriu acesso
        // Pegamos especificos por nome e não test-ids
        const btn5S = screen.getAllByRole('button', { name: /Integrar Automação/i })[0];
        fireEvent.click(btn5S);
        
        // State Setter do Redux/Contexto disparou pra descontar a loja inteira.
        expect(mockSetState).toHaveBeenCalledTimes(1);
    });
});
