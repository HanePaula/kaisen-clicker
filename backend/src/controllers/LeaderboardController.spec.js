const LeaderboardController = require('./LeaderboardController');

describe('LeaderboardController', () => {
    let mockService;
    let controller;
    let req;
    let res;

    beforeEach(() => {
        mockService = {
            getTopRanking: jest.fn(),
            submitScore: jest.fn()
        };
        controller = new LeaderboardController(mockService);

        req = { params: {}, body: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    describe('getRanking', () => {
        it('deve puxar query do req limitando a busca, chamando o metodo correto c/ Default', async () => {
            mockService.getTopRanking.mockResolvedValueOnce([{ score: 10 }]);
            
            await controller.getRanking(req, res); // Ausência do limit
            
            expect(mockService.getTopRanking).toHaveBeenCalledWith(10); // Valor Default!
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('deve resgatar param explícito limit via HTTP Query e forçar parse Int', async () => {
            req.query.limit = "50";
            mockService.getTopRanking.mockResolvedValueOnce([]);
            
            await controller.getRanking(req, res);
            
            expect(mockService.getTopRanking).toHaveBeenCalledWith(50);
        });

        it('deve converter throws do service para 400 Bad Request se tentarem limits insanos (>100)', async () => {
            req.query.limit = "150";
            mockService.getTopRanking.mockRejectedValueOnce(new Error('limite de busca do Ranking deve ser'));
            
            await controller.getRanking(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('submit', () => {
        it('deve extrair score body da request, salvar o highscore e bater de volta HTTP 201 Created', async () => {
            req.body = { score: 120, efficiency: 90 };
            mockService.submitScore.mockResolvedValueOnce({ id: 'novo-recorde', ...req.body });
            
            await controller.submit(req, res);
            
            expect(mockService.submitScore).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ score: 120 }));
        });

        it('deve devolver 400 em caso de cheater ou payload de pontuação estragado', async () => {
            req.body = { score: "cem" };
            mockService.submitScore.mockRejectedValueOnce(new Error('A pontuação informada é inválida'));
            
            await controller.submit(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
        });
    });
});
