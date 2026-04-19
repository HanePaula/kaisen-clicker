const PlayerService = require('./PlayerService');

describe('PlayerService', () => {
    let mockRepo;
    let service;

    beforeEach(() => {
        // Objeto de mock em memória substituindo o PostgreSQL
        mockRepo = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        // Aqui ocorre a injeção de dependência pura!
        service = new PlayerService(mockRepo);
    });

    describe('getAllPlayers', () => {
        it('deve repassar o retorno da lista sem alterações parciais (Sucesso)', async () => {
            mockRepo.findAll.mockResolvedValueOnce(['player_dummy']);
            const res = await service.getAllPlayers();
            expect(res).toEqual(['player_dummy']);
            expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('getPlayerById', () => {
        it('deve retornar a entidade quando o ID exisitar no repo (Sucesso)', async () => {
            mockRepo.findById.mockResolvedValueOnce({ id: '123' });
            const res = await service.getPlayerById('123');
            expect(res.id).toBe('123');
        });

        it('deve estourar erro interno quando não enviar string ID vazio (Erro)', async () => {
            await expect(service.getPlayerById('')).rejects.toThrow('obrigatório');
        });

        it('deve lançar exceção formal se o repositório retornar vazio Null (Not Found/Erro)', async () => {
            mockRepo.findById.mockResolvedValueOnce(null);
            await expect(service.getPlayerById('ghost')).rejects.toThrow('não encontrado');
        });
    });

    describe('createPlayer', () => {
        it('deve validar nome perfeito e salvar novo registro usando mock object (Sucesso)', async () => {
            mockRepo.create.mockImplementationOnce((data) => Promise.resolve(data));

            const res = await service.createPlayer({ username: '  Engineer1  ' }); // Passou espaço, deve ocorrer trim()
            
            expect(res.username).toBe('Engineer1'); // Verifica lógica de Trim incluída
            expect(res.id).toBeDefined(); // Verifica se o serviço gerou um crypto ID 
            expect(mockRepo.create).toHaveBeenCalledTimes(1);
        });

        it('deve estourar validação se username tiver menos que 3 letras de cumprimento (Erro)', async () => {
            await expect(service.createPlayer({ username: 'Oi' })).rejects.toThrow('entre 3 e 15 caracteres');
        });
    });

    describe('updatePlayer & deletePlayer', () => {
        it('deletePlayer: deve retornar boolean caso seja deletado de fato', async () => {
             mockRepo.delete.mockResolvedValueOnce(true);
             const r = await service.deletePlayer('id');
             expect(r).toBe(true);
        });

        it('deletePlayer: deve falhar ao enviar ID fantasma', async () => {
            mockRepo.delete.mockResolvedValueOnce(false); // Repo falhou em apagar records
            await expect(service.deletePlayer('ghost')).rejects.toThrow('não existe');
        });
        
        it('updatePlayer: deve rejeitar formato de nome ruim no update', async () => {
            await expect(service.updatePlayer('1', { username: 'a' })).rejects.toThrow('entre 3 e 15 caracteres');
        });
    });
});
