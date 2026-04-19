const express = require('express');
const router = express.Router();

const { leaderboardController } = require('../config/container');

// Mapeamento REST com Inversion Container
router.get('/', (req, res) => leaderboardController.getRanking(req, res));
router.post('/', (req, res) => leaderboardController.submit(req, res));

module.exports = router;
