import { describe, it, expect, vi } from 'vitest';
import { LeaderboardService } from './leaderboardService';
import api from './api';

vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe('LeaderboardService React Consumer', () => {
    it('deve parametrizar limit 10 na uri no estado default de chamadas', async () => {
        api.get.mockResolvedValueOnce([]);
        await LeaderboardService.getRanking();
        expect(api.get).toHaveBeenCalledWith('/leaderboard?limit=10'); // Default behavior
    });

    it('deve customizar a URI dinamicamente caso parametro limit seja especificado nos clicks de botoes de paginacao da tela', async () => {
        api.get.mockResolvedValueOnce([]);
        await LeaderboardService.getRanking(50);
        expect(api.get).toHaveBeenCalledWith('/leaderboard?limit=50');
    });

    it('deve despachar objecto contendo estado isolado da fábrica', async () => {
        api.post.mockResolvedValueOnce({ saved: true });
        const metric = { score: 9999, efficiency: 100.0, playerId: 'xyz' };
        
        await LeaderboardService.submitScore(metric);
        expect(api.post).toHaveBeenCalledWith('/leaderboard', metric);
    });
});
