import { describe, it, expect, vi } from 'vitest';
import { PlayerService } from './playerService';
import api from './api';

// Vitest Mock limpo da instacia singleton Axios
vi.mock('./api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}));

describe('PlayerService no React', () => {
    it('deve chamar a arvore HTTP GET na raiz do endpoint', async () => {
        api.get.mockResolvedValueOnce([]); // Mock de interceptor limpado
        await PlayerService.getAll();
        expect(api.get).toHaveBeenCalledWith('/players');
    });

    it('deve enviar POST enviando dados no path com as informações do formulário da UI', async () => {
        api.post.mockResolvedValueOnce({ id: 'created' });
        const obj = { username: 'KaizenMan' };
        
        await PlayerService.create(obj);
        expect(api.post).toHaveBeenCalledWith('/players', obj);
    });
});
