class LeaderboardController {
  constructor(leaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  async getRanking(req, res) {
    try {
      const limitParam = req.query.limit;
      const limit = limitParam ? parseInt(limitParam, 10) : 10;
      
      const ranking = await this.leaderboardService.getTopRanking(limit);
      return res.status(200).json(ranking);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async submit(req, res) {
    try {
      const payload = req.body;
      const entry = await this.leaderboardService.submitScore(payload);
      return res.status(201).json(entry);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = LeaderboardController;
