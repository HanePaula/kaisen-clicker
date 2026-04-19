import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useLeaderboard } from './useLeaderboard';
import { LeaderboardService } from '../services/leaderboardService';

vi.mock('../services/leaderboardService', () => ({
    LeaderboardService: {
        getRanking: vi.fn(),
        submitScore: vi.fn()
    }
}));

describe('useLeaderboard Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve inicializar com o state padrao isento do cache constando loading free (Sucesso/Initial)', () => {
        const { result } = renderHook(() => useLeaderboard());
        expect(result.current.loading).toBe(false);
        expect(result.current.ranking).toEqual([]);
        expect(result.current.error).toBeNull();
    });

    it('deve gerenciar estados loading dinâmicos, extrair os dados simulados por vi.mock e injetar o array (Caminho Feliz: fetchRanking)', async () => {
        LeaderboardService.getRanking.mockResolvedValueOnce([{ score: 50 }]);
        const { result } = renderHook(() => useLeaderboard());
        
        let hookPromise;
        // Agimos em cima da function do Hook (que reflete o onMounting do navegador)
        act(() => {
            hookPromise = result.current.fetchRanking();
        });
        
        // Verifica transição imediata visual de Componentes como Spinners que depende do Boolean
        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();

        await act(async () => {
            await hookPromise;
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.ranking).toEqual([{ score: 50 }]); // Check cache internal map populado
    });

    it('deve rejeitar promises engasgadas de networking e traduzi-las p/ string State (Caminho de Erro)', async () => {
        LeaderboardService.getRanking.mockRejectedValueOnce(new Error('A API caiu de vez.'));
        const { result } = renderHook(() => useLeaderboard());

        await act(async () => {
           try {
              await result.current.fetchRanking();
           } catch(e) {}
        });

        // O erro é salvo em memória pronta pro React renderizar na div
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('A API caiu de vez.');
    });
});
