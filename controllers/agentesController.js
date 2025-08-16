const agentesRepository = require('../repositories/agentesRepository');

// Função para validar datas
function isValidDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) return false;
  
  // Verificar se a data não está no futuro
  const today = new Date();
  return date <= today;
}

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

    // Validação do nome (não pode ser string vazia após trim)
    if (nome.trim() === '') {
      return res.status(400).json({ message: 'Nome não pode ser vazio.' });
    }

    // Validação da data
    if (!isValidDate(dataDeIncorporacao)) {
      return res.status(400).json({ message: 'Data de incorporação inválida ou no futuro.' });
    }

    // Validação do cargo (não pode ser string vazia após trim)
    if (cargo.trim() === '') {
      return res.status(400).json({ message: 'Cargo não pode ser vazio.' });
    }

    const newAgente = {
      nome: nome.trim(),
      dataDeIncorporacao,
      cargo: cargo.trim()
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

    // Validação do nome (não pode ser string vazia após trim)
    if (nome.trim() === '') {
      return res.status(400).json({ message: 'Nome não pode ser vazio.' });
    }

    // Validação da data
    if (!isValidDate(dataDeIncorporacao)) {
      return res.status(400).json({ message: 'Data de incorporação inválida ou no futuro.' });
    }

    // Validação do cargo (não pode ser string vazia após trim)
    if (cargo.trim() === '') {
      return res.status(400).json({ message: 'Cargo não pode ser vazio.' });
    }

    const updatedAgente = await agentesRepository.update(id, { 
      nome: nome.trim(), 
      dataDeIncorporacao, 
      cargo: cargo.trim() 
    });

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

    // Verificar se o payload não está vazio
    if (Object.keys(partialData).length === 0) {
      return res.status(400).json({ message: "Nenhum dado fornecido para atualização." });
    }

    // Validação do nome (não pode ser string vazia após trim)
    if (partialData.nome !== undefined) {
      if (partialData.nome.trim() === '') {
        return res.status(400).json({ message: 'Nome não pode ser vazio.' });
      }
      partialData.nome = partialData.nome.trim();
    }

    // Validação da data
    if (partialData.dataDeIncorporacao !== undefined) {
      if (!isValidDate(partialData.dataDeIncorporacao)) {
        return res.status(400).json({ message: 'Data de incorporação inválida ou no futuro.' });
      }
    }

    // Validação do cargo (não pode ser string vazia após trim)
    if (partialData.cargo !== undefined) {
      if (partialData.cargo.trim() === '') {
        return res.status(400).json({ message: 'Cargo não pode ser vazio.' });
      }
      partialData.cargo = partialData.cargo.trim();
    }

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

    if (!cargo || cargo.trim() === '') {
      return res.status(400).json({ message: 'Cargo não pode ser vazio.' });
    }

    const agentes = await agentesRepository.findByCargo(cargo.trim());
    res.status(200).json(agentes);
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

async function getCasosByAgente(req, res) {
  try {
    const { id } = req.params;
    
    // Verificar se o agente existe
    const agente = await agentesRepository.findById(id);
    if (!agente) {
      return res.status(404).json({ message: "Agente não encontrado." });
    }
    
    // Importar o repositório de casos
    const casosRepository = require('../repositories/casosRepository');
    
    // Buscar casos do agente
    const casos = await casosRepository.findByAgenteId(id);
    
    res.status(200).json(casos);
  } catch (error) {
    console.error('Erro ao buscar casos do agente:', error);
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
  getAgentesSorted,
  getCasosByAgente
};