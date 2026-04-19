import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { usePlayer } from './usePlayer';
import { PlayerService } from '../services/playerService';

vi.mock('../services/playerService', () => ({
    PlayerService: {
        update: vi.fn(),
        delete: vi.fn()
    }
}));

describe('usePlayer Profile Modifier Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve disparar com estados limpos de DOM render', () => {
        const { result } = renderHook(() => usePlayer());
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('deve iterar os marcadores de Spinners (loading flags) corretamente enquanto finaliza edição (Exemplo updateProfile: Sucesso)', async () => {
        PlayerService.update.mockResolvedValueOnce({ success: true });
        const { result } = renderHook(() => usePlayer());
        
        let promiseHookReq;
        act(() => {
             promiseHookReq = result.current.updateProfile('123', { username: 'NewAptoNome' });
        });
        
        // Falso transitorio para ativar UI
        expect(result.current.loading).toBe(true);

        await act(async () => {
             await promiseHookReq;
        });

        // Fechou carga
        expect(result.current.loading).toBe(false);
        expect(PlayerService.update).toHaveBeenCalledWith('123', { username: 'NewAptoNome' });
    });

    it('deve blindar o componente se houver falha de rede repassada pelo Service nativo axios guardada no state error', async () => {
        PlayerService.delete.mockRejectedValueOnce(new Error('Conexão recusada ao deletar o perfil.'));
        const { result } = renderHook(() => usePlayer());
        
        await act(async () => {
             try {
                await result.current.deleteProfile('uuidA');
             } catch(e) {}
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Conexão recusada ao deletar o perfil.');
    });
});
