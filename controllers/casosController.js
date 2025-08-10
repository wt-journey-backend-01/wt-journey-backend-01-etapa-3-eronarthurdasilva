const casosRepository = require("../repositories/casosRepository");

//função para pegar todos os casos 
function getAllCasos(req, res) {
    const casos = casosRepository.findAll();
    res.status(200).json(casos);
}


function createCaso(req, res){
    const { id, titulo, descricao, status, agente_id } = req.body;
    
    if (!id || !titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({ Message: "Todos os campos devem ser preenchidos."});
    }

    const statusValido = ["aberto", "solucionado", "arquivado"];
    if (!statusValido.includes(status)) {
        return res.status(400).json({
            Message: "Status inválido. Use 'aberto' ou 'solucionado' ou 'arquivado'."
        });
    }


    const casoNovo = { id: uuidv4(), titulo, descricao, status, agente_id };
    const casoCriado = casosRepository.create(casoNovo);
    const agenteExiste = agentesRepository.findById(agente_id);
    if (!agenteExiste) {
        return res.status(400).json({ message: "Agente não encontrado" });
    }

    return res.status(201).json(casoCriado);
}

// Funçaõ para achar os casos pelo id 
function getCasoById(req, res) {
    const { id } = req.params;

    const caso = casosRepository.findById(id);

    if (!caso) {
        return res.status(404).json({ Message: "Caso não encontrado." });
    }
    
    return res.status(200).json(caso);
}

//Função para atualizar os dados dos casos 
function updateCaso(req, res) {

    const { id } = req.params;

    const { titulo, descricao, status, agente_id } = req.body;

    if (!titulo || !descricao || !status || !agente_id) {
        return res.status(400).json({ message: "Todos os campos precisão ser preenchidos"});
    }

    const statusValido = ["aberto", "solucionado", "arquivado"];

    if(!statusValido.includes(status.toLowerCase())) {
        return res.status(400).json({
            message: "Status inválido. Use 'aberto', 'solucionado' ou 'arquivado'."
        });
    }

    const updated = casosRepository.update(id, { titulo, descricao, status: status.toLowerCase(), agente_id });

    if (!updated) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }

    return res.status(200).json(updated);

}

// Função para atualização partical 
function patchCaso(req, res) {

    const { id } = req.params;
    const updateData = req.body;

    if (updateData.status) {
        const statusValido = ["aberto", "solucionado", "arquivado" ];

        if (!statusValido.includes(updateData.status.toLowerCase())) {

            return res.status(400).json({
                message: "Status inválido. Use 'aberto' , 'solucionado' ou 'arquivado'."
            });
        }

        updateData.status = updateData.status.toLowerCase();

    }

    const updated = casosRepository.partialUpdate(id , updateData);

    if (!updated) {
        return res.status(404).json({ message: "Caso não encontrado"});
    }

    return res.status(200).json(updated);

}

// Função para remover casos
function deleteCaso(req, res) {
    
    const { id } = req.params;

    const deleted = casosRepository.remove(id);

    if (!deleted) {
        return res.status(404).json({ message: "Caso não encontrado" });
    }

    return res.status(204).end();

}
// Funções bonus 
function getCasosByAgente(req, res) {
    const { agente_id } = req.query;
    const casos = casosRepository.findAll().filter(caso => caso.agente_id === agente_id);
    res.status(200).json(casos);
}

function getCasosByStatus(req, res) {
    const { status } = req.query;
    const casos = casosRepository.findAll().filter(caso => caso.status === status);
    res.status(200).json(casos);
}

function searchCasos(req, res) {
    const { q } = req.query;
    const casos = casosRepository.findAll().filter(caso => 
        caso.titulo.includes(q) || caso.descricao.includes(q)
    );
    res.status(200).json(casos);
}


module.exports = {
    getAllCasos,
    createCaso,
    getCasoById,
    updateCaso,
    patchCaso,
    deleteCaso,
    getCasosByAgente,
    getCasosByStatus,
    searchCasos
};