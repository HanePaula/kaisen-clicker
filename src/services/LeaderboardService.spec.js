const LeaderboardService = require('./LeaderboardService');

describe('LeaderboardService', () => {
    let mockLRepo;
    let mockPService;
    let service;

    beforeEach(() => {
        mockLRepo = {
            findAll: jest.fn(),
            create: jest.fn()
        };
        mockPService = {
            getPlayerById: jest.fn()
        };
        
        service = new LeaderboardService(mockLRepo, mockPService);
    });

    describe('getTopRanking', () => {
        it('deve repassar requisição de top ranks normais (Sucesso)', async () => {
            mockLRepo.findAll.mockResolvedValueOnce([]);
            await service.getTopRanking(10);
            expect(mockLRepo.findAll).toHaveBeenCalledWith(10);
        });

        it('deve travar consulta perigosa solicitando muitas posições de vez (Erro/Regra)', async () => {
            await expect(service.getTopRanking(150)).rejects.toThrow('entre 1 e 100');
            await expect(service.getTopRanking(-5)).rejects.toThrow('entre 1 e 100');
        });
    });

    describe('submitScore', () => {
        it('deve aplicar salva-guarda num payload perfeitamente montado (Sucesso)', async () => {
            mockLRepo.create.mockImplementationOnce((p) => Promise.resolve(p));
            mockPService.getPlayerById.mockResolvedValueOnce({ id: 'p1' });

            const result = await service.submitScore({
                playerId: 'p1',
                score: 50000,
                efficiency: 95.5
            });

            expect(result.playerId).toBe('p1');
            expect(result.score).toBe(50000);
            expect(result.id).toBeDefined(); // Testando uuid injection
        });

        it('deve barrar submissão com eficiência corrompida, trapaça (Erro de Negócio)', async () => {
            await expect(service.submitScore({
                playerId: 'p1', score: 10, efficiency: 105.0 // Fake! Max=100
            })).rejects.toThrow('entre 0.0 e 100.0');

            await expect(service.submitScore({
                playerId: 'p1', score: -3, efficiency: 50 // Negative score string
            })).rejects.toThrow('A pontuação');
        });

        it('deve barrar a inserção no ranking caso o jogador repassado nao conste no Player Service cruzado (Erro)', async () => {
            // Repassando erro no mock inferior para cascatear em "invalid user" !
            mockPService.getPlayerById.mockRejectedValueOnce(new Error('Jogador não encontrado'));
            
            await expect(service.submitScore({
                playerId: 'ghost-uid', score: 10, efficiency: 90 
            })).rejects.toThrow('Jogador é inválido');
        });
    });
});
