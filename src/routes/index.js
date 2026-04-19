const express = require('express');
const router = express.Router();

// Grupos Subordinados
const playerRoutes = require('./playerRoutes');
const leaderboardRoutes = require('./leaderboardRoutes');

/**
 * Ponto de Montagem das Rotas 
 * Serve para que se no futuro a entidade /players mudar, o versionamento não quebre.
 */
router.use('/players', playerRoutes);
router.use('/leaderboard', leaderboardRoutes);

// Ping-Pong simples para teste de health da API
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Kaizen Clicker Factory API Online' });
});

module.exports = router;
