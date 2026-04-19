import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { KaizenDashboard } from './KaizenDashboard';
import { GameContext } from '../../context/GameContext';

describe('Smart Component com RTL Real (No Vitest Context Mocks): Kaizen', () => {
    it('deve extrair estados injetados via native React Context Provider Orgânico visando repasses estritos a components burros', () => {
        // Enfiando Context Default Rico simulado NA RAIS do Provider e não zoando as imports "vi.mock"!
        // ISSO GARANTE COMPORTAMENTO ORGÂNICO REAL EM REACT POIS SE AS CHAVES DO DB MUDAREM O TESTE FALHARÁ COMO QUEREMOS!
        const contextMockValue = {
            factoryState: { points: 15400, totalProduced: 300, defects: 0, efficiency: 100 },
            manualWork: () => {},
            resetGame: () => {}
        };

        render(
            <GameContext.Provider value={contextMockValue}>
                <KaizenDashboard />
            </GameContext.Provider>
        );
        
        expect(screen.getByRole('heading', { name: "Métricas Base OEE" })).toBeDefined();
        expect(screen.getByLabelText(/valor de caixa acumulado/i).textContent).toContain('15400 R$');
        expect(screen.getByLabelText(/valor de peças aprovadas/i).textContent).toContain('300 Lotes');
    });
});
