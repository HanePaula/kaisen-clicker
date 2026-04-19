import { vi, describe, it, expect } from 'vitest';
import { createInitialFactoryState, createLocalPlayer } from './index';

describe('Tipos de Domínio e Factories', () => {
    
    describe('createInitialFactoryState', () => {
        it('deve retornar os indicadores iniciais de fábrica pessimistas onde o jogador precisa gastar pontos e aplicar melhorias', () => {
            const state = createInitialFactoryState();
            
            expect(state.points).toBe(0);
            expect(state.totalProduced).toBe(0);
            
            // Verificando a Ineficiência Crítica inicial
            expect(state.productionRate).toBe(1);
            expect(state.defectRate).toBe(15.0);
            expect(state.efficiency).toBe(85.0);
        });
    });

    describe('createLocalPlayer', () => {
        it('deve gerar um objeto compatível com contrato "Player" localmente', () => {
            const player = createLocalPlayer('LeanThinker');
            
            expect(player.username).toBe('LeanThinker');
            expect(player.id).toContain('local-');
            
            // Garantir que a data retorna serializada ISO
            expect(() => new Date(player.createdAt)).not.toThrow();
        });
    });
});
