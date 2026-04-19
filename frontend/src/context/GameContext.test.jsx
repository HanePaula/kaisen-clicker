import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { GameProvider, useGame } from './GameContext';

import { GameEngine } from '../utils/GameEngine';

const DashboardTestView = () => {
    const { factoryState, manualWork, resetGame } = useGame();
    return (
        <div>
            <div data-testid="points">{factoryState.points}</div>
            <div data-testid="produced">{factoryState.totalProduced}</div>
            <button onClick={manualWork}>CriarPeca</button>
            <button onClick={resetGame}>ZerarFabrica</button>
        </div>
    );
};

describe('GameContext State Tree com Engine Separada', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('deve simular incremento positivo repassando ordens cegamente a GameEngine abstrata (SRP Impecável!)', () => {
        // Mockamos a Engine de Classe JS e não dependemos mais de flakiness randômicos no DOM test!
        const processSpy = vi.spyOn(GameEngine, 'processTick').mockReturnValue({
             points: 50,
             totalProduced: 1,
             defects: 0,
             defectRate: 15,
             efficiency: 100
        }); 

        render(
            <GameProvider>
                <DashboardTestView />
            </GameProvider>
        );
        
        fireEvent.click(screen.getByText('CriarPeca'));
        
        // Verificamos comportamento do Engine que independe do UI repassado visualmente! 
        expect(processSpy).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId('produced').textContent).toBe('1');
        expect(screen.getByTestId('points').textContent).toBe('50');
    });
});
