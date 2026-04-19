const express = require('express');
const router = express.Router();

// Princípio de Inversão de Dependências Aplicado Limpamente
const { playerController } = require('../config/container');

// Mapeamento REST para a Entidade Player
router.get('/', (req, res) => playerController.getAll(req, res));
router.get('/:id', (req, res) => playerController.getById(req, res));
router.post('/', (req, res) => playerController.create(req, res));
router.put('/:id', (req, res) => playerController.update(req, res));
router.delete('/:id', (req, res) => playerController.delete(req, res));

module.exports = router;
