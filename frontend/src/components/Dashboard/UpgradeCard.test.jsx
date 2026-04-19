import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UpgradeCard } from './UpgradeCard';

describe('Dumb Component: UpgradeCard UI', () => {
    it('deve montar template padrao limpo baseado nas varíaveis strings', () => {
        render(<UpgradeCard name="Metodologia 5S" description="Dá uma limpada" cost={100} isAffordable={true} />);
        
        // Validação A11y region label + Headers
        expect(screen.getByRole('article', { name: /Melhoria Kaizen: Metodologia 5S/i })).toBeDefined();
        expect(screen.getByRole('heading', { level: 4, name: /5S/i })).toBeDefined();
    });

    it('interação no botão da loja deve subir pra função pai prop através do evento (Affordable/Sucess)', () => {
        const handlePurchase = vi.fn();
        render(<UpgradeCard name="Poka-yoke" cost={100} isAffordable={true} onPurchase={handlePurchase} />);
        
        // Pegando sem Datatags (Rigor do Prompt)
        const btn = screen.getByRole('button', { name: /Integrar Automação/i });
        fireEvent.click(btn);
        
        expect(handlePurchase).toHaveBeenCalledTimes(1);
        expect(btn.hasAttribute('disabled')).toBe(false);
    });

    it('renderizando texto condicional de indisponibilidade e impedindo o click prop de subir e comprar (Negado)', () => {
        const mockPurchase = vi.fn();
        // Não possui diheiro
        render(<UpgradeCard name="TPM" cost={9000} isAffordable={false} onPurchase={mockPurchase} />);
        
        // Texto dinâmico condicional sendo verificado:
        const btn = screen.getByRole('button', { name: /Aguardando Capital/i });
        fireEvent.click(btn);
        
        expect(mockPurchase).not.toHaveBeenCalled();
        expect(btn.hasAttribute('disabled')).toBe(true);
    });
});
