class PlayerController {
  /**
   * Construtor injetando instâncias vitais.
   * @param {Object} playerService Instância do serviço que carrega as regras de negócio.
   */
  constructor(playerService) {
    this.playerService = playerService;
  }

  async getAll(req, res) {
    try {
      const players = await this.playerService.getAllPlayers();
      return res.status(200).json(players);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao buscar jogadores. ' + error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const player = await this.playerService.getPlayerById(id);
      return res.status(200).json(player);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const payload = req.body;
      const player = await this.playerService.createPlayer(payload);
      return res.status(201).json(player);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const player = await this.playerService.updatePlayer(id, payload);
      return res.status(200).json(player);
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.playerService.deletePlayer(id);
      return res.status(204).send(); // 204 No Content indica deleção de sucesso
    } catch (error) {
      if (error.message.includes('não existe')) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = PlayerController;
