const crypto = require('crypto');

class PlayerService {
  /**
   * Construtor exigindo Injeção de Dependências.
   * Totalmente desacoplado do Banco de Dados.
   * @param {Object} playerRepository 
   */
  constructor(playerRepository) {
    this.playerRepository = playerRepository;
  }

  async getAllPlayers() {
    return await this.playerRepository.findAll();
  }

  async getPlayerById(id) {
    if (!id) throw new Error('ID do jogador é obrigatório.');
    
    const player = await this.playerRepository.findById(id);
    if (!player) throw new Error('Jogador não encontrado.');
    
    return player;
  }

  async createPlayer(data) {
    // Regra de Negócio: O Nome de usuário precisa ser válido
    if (!data.username) {
      throw new Error('O nome de usuário (username) é obrigatório.');
    }
    
    const usernameLength = data.username.trim().length;
    if (usernameLength < 3 || usernameLength > 15) {
      throw new Error('O nome de usuário deve ter entre 3 e 15 caracteres.');
    }

    // Regra de Negócio: Geração de Chaves isolada no Serviço (Domain Logic)
    const payload = {
      id: crypto.randomUUID(),
      username: data.username.trim(),
      createdAt: new Date()
    };

    return await this.playerRepository.create(payload);
  }

  async updatePlayer(id, data) {
    if (!id) throw new Error('ID do jogador é obrigatório para atualização.');
    
    if (!data.username || data.username.trim().length < 3 || data.username.trim().length > 15) {
      throw new Error('O novo nome de usuário deve ter entre 3 e 15 caracteres.');
    }

    const updated = await this.playerRepository.update(id, { username: data.username.trim() });
    
    if (!updated) {
      throw new Error('Jogador não encontrado para atualização.');
    }
    
    return updated;
  }

  async deletePlayer(id) {
    if (!id) throw new Error('ID do jogador é obrigatório para deletá-lo.');
    
    const deleted = await this.playerRepository.delete(id);
    if (!deleted) throw new Error('Jogador não pôde ser apagado pois não existe.');
    
    return true;
  }
}

module.exports = PlayerService;
