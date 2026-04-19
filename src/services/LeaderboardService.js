const crypto = require('crypto');

class LeaderboardService {
  /**
   * Construtor usando Injeção de Dependência.
   * @param {Object} leaderboardRepository 
   * @param {Object} playerService - Opcionalmente injetamos o outro Service caso cruze regras
   */
  constructor(leaderboardRepository, playerService) {
    this.leaderboardRepository = leaderboardRepository;
    this.playerService = playerService;
  }

  async getTopRanking(limit = 10) {
    // Regra de Negócio: Limitando paginação para proteger performance da Query
    if (limit <= 0 || limit > 100) {
      throw new Error('O limite de busca do Ranking deve ser entre 1 e 100.');
    }
    return await this.leaderboardRepository.findAll(limit);
  }

  async submitScore(data) {
    // Regra de Negócio: Validações duras de trapaça e formatação do Kaizen Clicker
    if (!data.playerId) {
      throw new Error('ID do Jogador associado é obrigatório.');
    }
    if (typeof data.score !== 'number' || data.score < 0) {
      throw new Error('A pontuação informada é totalmente inválida.');
    }
    if (typeof data.efficiency !== 'number' || data.efficiency < 0 || data.efficiency > 100.0) {
      throw new Error('A eficiência da fábrica deve estar formatada em porcentagem (%): entre 0.0 e 100.0.');
    }

    // Regra de Negócio Opcional: Checar existência prévia do jogador (se o Serviço estiver injetado)
    if (this.playerService) {
      try {
        await this.playerService.getPlayerById(data.playerId);
      } catch (err) {
        throw new Error('Não foi possível submeter a pontuação porque o Jogador é inválido ou inexistente.');
      }
    }

    const payload = {
      id: crypto.randomUUID(),
      playerId: data.playerId,
      score: data.score,
      efficiency: data.efficiency,
      updatedAt: new Date()
    };

    return await this.leaderboardRepository.create(payload);
  }
}

module.exports = LeaderboardService;
