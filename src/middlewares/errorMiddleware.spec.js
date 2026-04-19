const errorHandler = require('./errorMiddleware');

describe('Global Error Handler Middleware', () => {
    let err, req, res, next;

    beforeEach(() => {
        err = new Error('Falha aleatória simulada acionou no App');
        req = {};
        res = {
            headersSent: false,
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('deve formatar exception default mapeando como 500 Internal em JSON estruturado (Caminho Defensivo)', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});

        errorHandler(err, req, res, next);
        
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Falha aleatória simulada acionou no App' }));
    });

    it('deve extrair a property customizada se o serviço injetou Status (Status Customizado - Tratamento)', () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        err.statusCode = 403;
        err.message = 'Permissão Negada';

        errorHandler(err, req, res, next);
        
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Permissão Negada' }));
    });

    it('deve pular o JSON e disparar next(err) default handler se headers (Headers Locked/Prevenção)', () => {
        res.headersSent = true;
        errorHandler(err, req, res, next);
        
        expect(next).toHaveBeenCalledWith(err);
        expect(res.status).not.toHaveBeenCalled();
    });
});
