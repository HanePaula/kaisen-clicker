const LeaderboardRepository = require('./LeaderboardRepository');
const pool = require('../config/database');

// Interceptamos as requisições ao PostgreSQL para testes unitários isolados
jest.mock('../config/database', () => ({
  query: jest.fn()
}));

describe('LeaderboardRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar a lista de entradas com sucesso em cenário positivo', async () => {
      const mockRows = [{ id: '1', score: 100 }, { id: '2', score: 80 }];
      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const result = await LeaderboardRepository.findAll(10);
      
      expect(result).toEqual(mockRows);
      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [10]);
    });

    it('deve propagar o erro caso o banco fique indisponível (Cenário de Erro)', async () => {
      pool.query.mockRejectedValueOnce(new Error('Connection timeout'));
      
      await expect(LeaderboardRepository.findAll()).rejects.toThrow('Connection timeout');
    });
  });

  describe('findById', () => {
    it('deve retornar a entidade caso encontre (Sucesso)', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 'uuid-xyz' }] });
      
      const result = await LeaderboardRepository.findById('uuid-xyz');
      expect(result).toEqual({ id: 'uuid-xyz' });
    });

    it('deve retornar null se nenhum UUID corresponder na base', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const result = await LeaderboardRepository.findById('not-found');
      expect(result).toBeNull();
    });

    it('deve propagar erro se a query falhar por syntax err (Erro)', async () => {
      pool.query.mockRejectedValueOnce(new Error('Syntax Error on database SQL'));
      
      await expect(LeaderboardRepository.findById('id')).rejects.toThrow('Syntax Error on database SQL');
    });
  });

  describe('create', () => {
    it('deve injetar e retornar os dados salvos em cenário de sucesso', async () => {
      const mockData = { id: 'entry-1', playerId: 'player-x', score: 50, efficiency: 90 };
      pool.query.mockResolvedValueOnce({ rows: [mockData] });
      
      const result = await LeaderboardRepository.create(mockData);
      
      expect(result).toEqual(mockData);
      expect(pool.query).toHaveBeenCalledTimes(1);
    });

    it('deve falhar e repassar erros como quebra de Constraint UNIQUE (Erro)', async () => {
      pool.query.mockRejectedValueOnce(new Error('Duplicate key violation'));
      
      await expect(LeaderboardRepository.create({})).rejects.toThrow('Duplicate key violation');
    });
  });

  describe('update', () => {
    it('deve aplicar as mudanças e retornar os dados já atualizados (Sucesso)', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: '1', score: 100 }] });
      
      const result = await LeaderboardRepository.update('1', { score: 100, efficiency: 95 });
      
      expect(result).not.toBeNull();
      // Verificando que array de valores reflete update (score=100, eficiencia=95)
      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [100, 95, expect.any(Date), '1']);
    });

    it('deve retornar null ao tentar atualizar ID que já foi apagado do banco', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // Update nulo do RETURNING row
      
      const result = await LeaderboardRepository.update('ghost-id', { score: 1 });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve confirmar a deleção via boolean true ao detectar linhas removidas (Sucesso)', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: '1' }] });
      
      const result = await LeaderboardRepository.delete('1');
      expect(result).toBe(true);
      expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    });

    it('deve retornar false no booleano se o ID não existia (Nenhuma ação no BD)', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const result = await LeaderboardRepository.delete('not-found');
      expect(result).toBe(false);
    });

    it('deve dar catch propagedo em caso de falha de privilégios revogados do BD (Erro)', async () => {
      pool.query.mockRejectedValueOnce(new Error('Permission denied for table'));
      
      await expect(LeaderboardRepository.delete('1')).rejects.toThrow('Permission denied');
    });
  });
});
