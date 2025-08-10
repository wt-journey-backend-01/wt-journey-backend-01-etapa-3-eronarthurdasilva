const agentesRepository = require('../repositories/agentesRepository');

async function getAllAgentes(req, res) {
  try {
    const agentes = await agentesRepository.findAll();
    res.status(200).json(agentes);
  } catch (error) {
    console.error('Erro ao buscar agentes:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

async function getAgenteById(req, res) {
  try {
    const { id } = req.params;
    const agente = await agentesRepository.findById(id);

    if (!agente) {
      return res.status(404).json({ message: "Agente não encontrado." });
    }

    res.status(200).json(agente);
  } catch (error) {
    console.error("Erro ao buscar agente: ", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}

async function createAgente(req, res) {
  try {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    
    // Valida a entrada
    if (!nome || !dataDeIncorporacao || !cargo) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newAgente = {
      nome,
      dataDeIncorporacao,
      cargo
    };

    const createdAgente = await agentesRepository.create(newAgente);
    res.status(201).json(createdAgente[0]);
  } catch (error) {
    console.error('Erro ao criar agente:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

async function updateAgente(req, res) {
  try {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo } = req.body;

    if (!nome || !dataDeIncorporacao || !cargo) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const updatedAgente = await agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });

    if (!updatedAgente || updatedAgente.length === 0) {
      return res.status(404).json({ message: "Agente não encontrado." });
    }

    res.status(200).json(updatedAgente[0]);
  } catch (error) {
    console.error('Erro ao atualizar agente:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

async function patchAgente(req, res) {
  try {
    const { id } = req.params;
    const partialData = req.body;

    const updatedAgente = await agentesRepository.partialUpdate(id, partialData);

    if (!updatedAgente || updatedAgente.length === 0) {
      return res.status(404).json({ message: "Agente não encontrado." });
    }

    res.status(200).json(updatedAgente[0]);
  } catch (error) {
    console.error('Erro ao atualizar parcialmente agente:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

async function deleteAgente(req, res) {
  try {
    const { id } = req.params;
    const deleted = await agentesRepository.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: "Agente não encontrado ou já deletado." });
    }

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao deletar agente:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

async function getAgentesByCargo(req, res) {
  try {
    const { cargo } = req.query;
    const agentes = await agentesRepository.findAll();
    const filteredAgentes = agentes.filter(agente => agente.cargo.toLowerCase() === cargo.toLowerCase());
    res.status(200).json(filteredAgentes);
  } catch (error) {
    console.error('Erro ao buscar agentes por cargo:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

async function getAgentesSorted(req, res) {
  try {
    const { sort } = req.query;
    const agentes = await agentesRepository.findAll();
    
    const sortedAgentes = [...agentes];
    sortedAgentes.sort((a, b) => {
      const dateA = new Date(a.dataDeIncorporacao);
      const dateB = new Date(b.dataDeIncorporacao);
      return sort.startsWith('-') ? dateB - dateA : dateA - dateB;
    });
    
    res.status(200).json(sortedAgentes);
  } catch (error) {
    console.error('Erro ao buscar agentes ordenados:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
}

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente,
  getAgentesByCargo,
  getAgentesSorted
};