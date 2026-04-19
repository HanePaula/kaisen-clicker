import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Dumb Component: Button', () => {
    it('deve renderizar estritamente o valor repassado no texto puro padrao (Sucesso)', () => {
        render(<Button>Executar Kaizen</Button>);
        
        // Padrão rigoroso TDD Acessível: query pelas tags semânticas da árvore A11y, nunca data-testids
        expect(screen.getByRole('button', { name: /executar kaizen/i })).toBeDefined();
    });

    it('deve disparar evento click mapeado atrelado na prop onClick perfeitamente', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Ação</Button>);
        
        fireEvent.click(screen.getByRole('button', { name: /ação/i }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('nao deve acionar a prop onclick caso a variavel booleana de prop condicional {disabled} esteja acesa', () => {
        const handleClick = vi.fn();
        render(<Button disabled onClick={handleClick}>Bloqueado</Button>);
        
        const btn = screen.getByRole('button', { name: /bloqueado/i });
        fireEvent.click(btn);
        
        expect(handleClick).not.toHaveBeenCalled(); // Validar supressão
        expect(btn.hasAttribute('disabled')).toBe(true);
    });
});
