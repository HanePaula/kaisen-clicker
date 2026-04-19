import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MetricCard } from './MetricCard';

describe('Dumb Component: MetricCard', () => {
    it('deve extrair props textuais injetadas e desenhá-las em landmarks acessíveis via Aria (Caminho Comum)', () => {
        render(<MetricCard title="Estoque Atual" value={1500} unit="peças" />);
        
        // Verifica Heading principal
        expect(screen.getByRole('heading', { level: 3, name: /estoque atual/i })).toBeDefined();
        
        // Verifica leitura clara para Leitores de Tela na paragraph
        expect(screen.getByLabelText(/valor de estoque atual/i).textContent).toContain('1500 peças');
    });

    it('deve estampar elemento visual na tela (condicional highlight) se true', () => {
        render(<MetricCard title="Eficiência" value={100} unit="%" highlight={true} />);
        
        // Role Status é uma tag padrão W3C para indicar conquistas / avisos importantes do site sem o user clicar nada
        expect(screen.getByText(/padrão ouro/i)).toBeDefined();
    });

    it('nao permite render condicional do span de status se highligh ausente na prop', () => {
        render(<MetricCard title="Defeitos" value={0} highlight={false} />);
        
        // queryBy não estoura Exception do Jest, ideal para testar ausências no HTML
        expect(screen.queryByRole('status')).toBeNull();
    });
});
