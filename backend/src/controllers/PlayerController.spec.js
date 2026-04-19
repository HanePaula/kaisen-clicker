const PlayerController = require('./PlayerController');

describe('PlayerController', () => {
    let mockService;
    let controller;
    let req;
    let res;

    beforeEach(() => {
        // Mock do Service usando Jest puro sem importação de arquivos
        mockService = {
            getAllPlayers: jest.fn(),
            getPlayerById: jest.fn(),
            createPlayer: jest.fn(),
            updatePlayer: jest.fn(),
            deletePlayer: jest.fn()
        };
        controller = new PlayerController(mockService);

        // Estrutura dummy espelhando o Express HTTP
        req = { params: {}, body: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    describe('getAll', () => {
        it('deve devolver os valores do serviço na forma de JSON retornando status 200 OK (Sucesso)', async () => {
            const playersMock = [{ id: '1', username: 'Test' }];
            mockService.getAllPlayers.mockResolvedValueOnce(playersMock);
            
            await controller.getAll(req, res);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(playersMock);
        });

        it('deve contornar a quebra do servidor caso o banco caia em findAll retornando HTTP 500 (Erro Interno)', async () => {
            mockService.getAllPlayers.mockRejectedValueOnce(new Error('Fatal disconnection'));
            await controller.getAll(req, res);
            
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringContaining('Fatal') }));
        });
    });

    describe('getById', () => {
        it('deve extrair params.id e retornar 200 com os dados do jogador (Sucesso)', async () => {
            req.params.id = 'uuid-2';
            mockService.getPlayerById.mockResolvedValueOnce({ id: 'uuid-2', username: 'A' });
            
            await controller.getById(req, res);
            
            expect(mockService.getPlayerById).toHaveBeenCalledWith('uuid-2');
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('deve mapear a mensagem "não encontrado" (404 Not Found) e capturá-la limpa no retorno do Controller', async () => {
            mockService.getPlayerById.mockRejectedValueOnce(new Error('Jogador não encontrado.'));
            
            await controller.getById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('create', () => {
        it('deve repassar o req.body limpo e devolver HTTP 201 Created com a entidade formatada', async () => {
            req.body = { username: 'NovoJogador' };
            const returnData = { id: 'x', username: 'NovoJogador' };
            mockService.createPlayer.mockResolvedValueOnce(returnData);
            
            await controller.create(req, res);
            
            expect(mockService.createPlayer).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(returnData);
        });

        it('deve devolver Bad Request (HTTP 400) se o Service gritar um erro de nome de usuário inválido', async () => {
            mockService.createPlayer.mockRejectedValueOnce(new Error('nome entre 3 e 15 caracteres'));
            
            await controller.create(req, res);
            expect(res.status).toHaveBeenCalledWith(400); // Bad form
        });
    });

    describe('delete', () => {
        it('deve retornar explicitamente 204 No Content se apagar do BD por trás dos pânos', async () => {
            req.params.id = '123';
            mockService.deletePlayer.mockResolvedValueOnce(true);
            
            await controller.delete(req, res);
            
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });
    });
});
