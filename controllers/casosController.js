const casosRepository = require('../repositories/casosRepository');

async function getAllCasos(req, res) {
  try {
    const casos = await casosRepository.findAll();
    res.status(200).json(casos);
  } catch (error) {
    console.error('Erro ao listar casos:', error);
    res.status(500).json({ message: 'Erro ao listar casos.' });
  }
}

async function createCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const novoCaso = await casosRepository.create({ titulo, descricao, status, agente_id });
    res.status(201).json(novoCaso);
  } catch (error) {
    console.error('Erro ao criar caso:', error);
    res.status(500).json({ message: 'Erro ao criar caso.' });
  }
}

async function getCasoById(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    const caso = await casosRepository.findById(id);
    if (!caso) {
      return res.status(404).json({ message: 'Caso não encontrado.' });
    }

    res.status(200).json(caso);
  } catch (error) {
    console.error('Erro ao buscar caso por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar caso por ID.' });
  }
}

async function updateCaso(req, res) {
  try {
    const { id } = req.params;
    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const casoAtualizado = await casosRepository.update(id, { titulo, descricao, status, agente_id });
    res.status(200).json(casoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar caso:', error);
    res.status(500).json({ message: 'Erro ao atualizar caso.' });
  }
}

async function deleteCaso(req, res) {
  try {
    const { id } = req.params;

    const casoDeletado = await casosRepository.remove(id);
    if (!casoDeletado) {
      return res.status(404).json({ message: 'Caso não encontrado.' });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar caso:', error);
    res.status(500).json({ message: 'Erro ao deletar caso.' });
  }
}

async function getCasosByStatus(req, res) {
  try {
    const { status } = req.query;

    if (!status) {
      return res.status(400).json({ message: 'Status é obrigatório.' });
    }

    const casos = await casosRepository.findByStatus(status);
    res.status(200).json(casos);
  } catch (error) {
    console.error('Erro ao buscar casos por status:', error);
    res.status(500).json({ message: 'Erro ao buscar casos por status.' });
  }
}

async function getCasosByAgente(req, res) {
  try {
    const { agente_id } = req.query;

    if (!agente_id) {
      return res.status(400).json({ message: 'ID do agente é obrigatório.' });
    }

    const casos = await casosRepository.findByAgenteId(agente_id);
    res.status(200).json(casos);
  } catch (error) {
    console.error('Erro ao buscar casos por agente:', error);
    res.status(500).json({ message: 'Erro ao buscar casos por agente.' });
  }
}

async function searchCasos(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Palavra-chave é obrigatória.' });
    }

    const casos = await casosRepository.buscarPorTermo(q);
    res.status(200).json(casos);
  } catch (error) {
    console.error('Erro ao buscar casos por palavra-chave:', error);
    res.status(500).json({ message: 'Erro ao buscar casos por palavra-chave.' });
  }
}

module.exports = {
  getAllCasos,
  createCaso,
  getCasoById,
  updateCaso,
  deleteCaso,
  getCasosByStatus,
  getCasosByAgente,
  searchCasos
};