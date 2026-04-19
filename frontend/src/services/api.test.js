import { describe, it, expect } from 'vitest';
import api from './api';

describe('Singleton API Base Tracker', () => {
    it('deve injetar uma string com base de url por padrão conectada à porta do servidor backend local', () => {
        expect(api.defaults.baseURL).toContain('api');
        expect(api.defaults.timeout).toBe(10000);
    });

    it('deve ter as funções globais de tratamento de request/response e interceptors instalados', () => {
        // Garantindo que a lógica das blindagens contra dados de erro existam
        expect(api.interceptors.response.handlers.length).toBeGreaterThan(0);
        expect(api.interceptors.request.handlers.length).toBeGreaterThan(0);
    });
});
