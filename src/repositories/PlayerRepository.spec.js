const PlayerRepository = require('./PlayerRepository');
const pool = require('../config/database');

jest.mock('../config/database', () => ({
  query: jest.fn()
}));

describe('PlayerRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('deve retornar todos os perfis dos rankings com base na data (Sucesso)', async () => {
      const mockRows = [{ id: '1', username: 'KaizenMaster' }];
      pool.query.mockResolvedValueOnce({ rows: mockRows });

      const result = await PlayerRepository.findAll();
      
      expect(result).toEqual(mockRows);
      expect(pool.query).toHaveBeenCalledWith(expect.any(String));
    });

    it('deve propagar erro de SQL Injection se a string estiver mal formada (Cenário de Erro)', async () => {
      pool.query.mockRejectedValueOnce(new Error('Connection Failed/Query Malformed'));
      
      await expect(PlayerRepository.findAll()).rejects.toThrow('Connection Failed');
    });
  });

  describe('findById', () => {
    it('deve resgatar estritamente uma row baseada pelo Id (Sucesso)', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: 'uuid-player', username: 'TestUser' }] });
      
      const result = await PlayerRepository.findById('uuid-player');
      expect(result).toEqual({ id: 'uuid-player', username: 'TestUser' });
    });

    it('deve resolver em null quando a identificação bater em lugar nenhum no banco', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const result = await PlayerRepository.findById('ghost');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('deve inserir os UUIDs e a timestamp default e retornar o registro inteiro salvo (Sucesso)', async () => {
      const mockData = { id: 'p-1', username: 'NewEngineer', createdAt: new Date() };
      pool.query.mockResolvedValueOnce({ rows: [mockData] });

      const result = await PlayerRepository.create(mockData);
      
      expect(result).toEqual(mockData);
      expect(result.username).toBe('NewEngineer');
      expect(pool.query).toHaveBeenCalledTimes(1);
    });

    it('deve falhar e propagar crash em caso de username duplicado caindo numa rule de "UNIQUE constraint" (Cenário de Erro)', async () => {
      pool.query.mockRejectedValueOnce(new Error('duplicate key value violates unique constraint'));
      
      await expect(PlayerRepository.create({ username: 'ExistentName' })).rejects.toThrow('duplicate key');
    });
  });

  describe('update', () => {
    it('deve dar override nos dados selecionados usando o ID (Sucesso)', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: '1', username: 'NovoNomeEditado' }] });
      
      const result = await PlayerRepository.update('1', { username: 'NovoNomeEditado' });
      
      expect(result).not.toBeNull();
      expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['NovoNomeEditado', '1']);
    });

    it('deve retornar nulo se o player requisitando uma edição de profile não constar no backend', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] }); // O RETURNING vem vazio
      
      const result = await PlayerRepository.update('ghost-user', { username: 'ghost' });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('vai apagar uma ID explora ao máximo do table e retornar o true indicativo no pool (Sucesso)', async () => {
      pool.query.mockResolvedValueOnce({ rows: [{ id: '1' }] });
      
      const result = await PlayerRepository.delete('1');
      
      expect(result).toBe(true);
      expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    });

    it('deve acusar falsidade "false" caso o UUID estivesse vago sem nada ser apagado', async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });
      
      const result = await PlayerRepository.delete('999-not-found');
      expect(result).toBe(false);
    });

    it('deve ser interrompido sob erro de foreign key se tentarmos deletá-lo sem apagar o Leaderboard associado (Cascata/Erro)', async () => {
      pool.query.mockRejectedValueOnce(new Error('violates foreign key constraint'));
      
      await expect(PlayerRepository.delete('1')).rejects.toThrow('foreign key constraint');
    });
  });
});
