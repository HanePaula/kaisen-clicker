const validateInput = require('./validationMiddleware');

describe('Validation Middleware Builder', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('deve deixar seguir para o proximo node de rede next() se todos forms estiverem exatos (Caminho Limpo)', () => {
        req.body = { email: 'teste@teste.com', age: 25 };
        
        const mySchema = validateInput([{ field: 'email' }, { field: 'age' }]);

        mySchema(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
    });

    it('deve capturar vazios, barrar processo devolvendo array de Erros 400 Bad Request agregado (Falha de Inserção Múltiplas)', () => {
        // Envio de body falso com undefined propositais
        req.body = { username: null, email: '' }; 
        
        const mySchema = validateInput([
            { field: 'email', message: 'Sem E-mail não rola.' },
            { field: 'username', message: 'Faltou nick.' },
            { field: 'token', location: 'headers', message: 'Cadê no header?' } // Buscando fora do body inclusive
        ]);

        mySchema(req, res, next);
        
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: ['Sem E-mail não rola.', 'Faltou nick.', 'Cadê no header?']
        });
        expect(next).not.toHaveBeenCalled();
    });
});
