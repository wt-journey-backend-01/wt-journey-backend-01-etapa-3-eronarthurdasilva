const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

// Rota para listar todos os casos e criar um novo caso
router.get('/', casosController.getAllCasos);
router.post('/', casosController.createCaso);

// Rotas bônus: Filtrar por status, buscar por agente e pesquisar por palavra-chave
router.get('/status', casosController.getCasosByStatus);
router.get('/agente', casosController.getCasosByAgente);
router.get('/search', casosController.searchCasos);

// Rotas para um caso específico por ID
router.get('/:id', casosController.getCasoById);
router.put('/:id', casosController.updateCaso);
router.delete('/:id', casosController.deleteCaso);

module.exports = router;