const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

// Rota para listar todos os agentes e criar um novo agente
router.get('/', agentesController.getAllAgentes);
router.post('/', agentesController.createAgente);

// Rotas para um agente específico por ID
router.get('/:id', agentesController.getAgenteById);
router.put('/:id', agentesController.updateAgente);
router.delete('/:id', agentesController.deleteAgente);

// Rota Bônus: Listar todos os casos de um agente específico
// Comentado temporariamente até implementar a função no controlador
// router.get('/:id/casos', agentesController.getCasosByAgente);

module.exports = router;