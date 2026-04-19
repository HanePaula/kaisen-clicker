// IoC Container Manual do Node.js
// Aqui invertemos a dependência: as Rotas e Web Servers não instanciam código de Bancos SQL ou Lógicas locais, elas as Consomem já formadas!

const PlayerRepository = require('../repositories/PlayerRepository');
const LeaderboardRepository = require('../repositories/LeaderboardRepository');
const PlayerService = require('../services/PlayerService');
const LeaderboardService = require('../services/LeaderboardService');
const PlayerController = require('../controllers/PlayerController');
const LeaderboardController = require('../controllers/LeaderboardController');

// Singleton Injection Builder
const playerRepository = new PlayerRepository();
const leaderboardRepository = new LeaderboardRepository();

const playerService = new PlayerService(playerRepository);
const leaderboardService = new LeaderboardService(leaderboardRepository, playerService);

const playerController = new PlayerController(playerService);
const leaderboardController = new LeaderboardController(leaderboardService);

// Exportando os Endpoints Finais para Uso na Rota HTTP sem sujeitar o Middleware Express ao acoplamento do sistema de dados (DIP OK!)
module.exports = {
  playerController,
  leaderboardController
};
