const jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

describe('Auth Middleware', () => {
    beforeAll(() => {
        process.env.JWT_SECRET = 'test-secret-key';
    });

    let req, res, next;

    beforeEach(() => {
        req = { headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('deve deixar passar (next) injetando o payload no "req.user" se o token for perfeito (Sucesso)', () => {
        req.headers.authorization = 'Bearer valid-jwt-token';
        jwt.verify.mockReturnValueOnce({ id: 'user-123' });

        authMiddleware(req, res, next);
        
        expect(jwt.verify).toHaveBeenCalledWith('valid-jwt-token', expect.any(String));
        expect(req.user.id).toBe('user-123');
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('deve retornar HTTP 401 (Unauthorized) se absolutamente nenhum token for passado (Falha)', () => {
        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('não fornecido') });
        expect(next).not.toHaveBeenCalled();
    });

    it('deve retornar 401 travando a rede se vier sem prefixo Bearer e corrompido (Falha/Formatação)', () => {
        req.headers.authorization = 'apenas-token-sem-bearer';
        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('deve retornar HTTP 401 bloquear a conexão se o JWT internamente dizer que expirou ou ta forged (Falha)', () => {
        req.headers.authorization = 'Bearer fake-token';
        jwt.verify.mockImplementationOnce(() => { throw new Error('jwt expired') });

        authMiddleware(req, res, next);
        
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining('Acesso Restrito: Chaves Ilegais ou Vencidas') });
    });
});
