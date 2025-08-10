const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

async function getAllAgentes(req, res) {
  try {
    const agentes = await agentesRepository.findAll();
    res.status(200).json(agentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar agentes.' });
  }
}

//Função para busca de agente 
function getAgenteById(req, res) {
  try{
    const { id } = req.params;
    const agente = agentesRepository.findById(id);

    if (!agente) {
      return res.status(404).json({message: "Agente não encontrado."});
    }

    res.status(200).json(agente);
    
  } catch (error){
    console.error("Erro ao byscar agente: ", error);
    res.status(500).json({ message: "Erro interno no servidor."});
  }
  

}
// Metodo para criar um no agente 


async function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [createdAgente] = await agentesRepository.create({ nome, dataDeIncorporacao, cargo });
    res.status(201).json(createdAgente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar agente.' });
  }
}

//Metodo para atualizar dados dos agentes
function updateAgente(req, res){
  const { id } = req.params;
  const { nome, dataDeIncorporacao, cargo} = req.body;

  if (!nome || !dataDeIncorporacao || !cargo) {
    return res.status(400).json({ message: "todos os campos são obrigatórios"});
  }

  const updatedAgente = agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });

  if (!updatedAgente) {
    return res.status(404).json({ message: "Agente não encontrado."});
  }

  res.status(200).json(updatedAgente);

}

//Metodo para atualização parcial 
function patchAgente(req, res){
  const { id } = req.params;
  const partialData = req.body;

  const updatedAgente = agentesRepository.partialUpdate(id, partialData);

  if (!updatedAgente) {
    return res.status(404).json({ message: "Agente não encontrado."});
  }

  res.status(200).json(updatedAgente);
}

//Metodo para deletar agentes
async function deleteAgente(req, res) {
  const { id } = req.params;

  try {
    const deleted = await agentesRepository.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Agente não encontrado ou já deletado.' });
    }

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar agente.' });
  }
}

// Funções bonus 
async function getAgentesByCargo(req, res) {
  const { cargo } = req.query;

  try {
    const agentes = await agentesRepository.findByCargo(cargo);
    res.status(200).json(agentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar agentes por cargo.' });
  }
}

function getAgentesSorted(req, res) {
    const { sort } = req.query;
    const agentes = [...agentesRepository.findAll()];
    
    agentes.sort((a, b) => {
        const dateA = new Date(a.dataDeIncorporacao);
        const dateB = new Date(b.dataDeIncorporacao);
        return sort.startsWith('-') ? dateB - dateA : dateA - dateB;
    });
    
    res.status(200).json(agentes);
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