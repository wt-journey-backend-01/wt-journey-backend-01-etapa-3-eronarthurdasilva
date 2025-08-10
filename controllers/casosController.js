const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

async function getAllCasos(req, res) {
    try {
        const casos = await casosRepository.findAll();
        res.status(200).json(casos);
    } catch (error) {
        console.error('Erro ao buscar casos:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function createCaso(req, res) {
    try {
        const { titulo, descricao, status, agente_id } = req.body;
        
        if (!titulo || !descricao || !status || !agente_id) {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
        }

        const statusValido = ["aberto", "solucionado", "arquivado"];
        if (!statusValido.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: "Status inválido. Use 'aberto' ou 'solucionado' ou 'arquivado'."
            });
        }

        // Verificar se o agente existe
        const agenteExiste = await agentesRepository.findById(agente_id);
        if (!agenteExiste) {
            return res.status(400).json({ message: "Agente não encontrado" });
        }

        const casoNovo = { 
            titulo, 
            descricao, 
            status: status.toLowerCase(), 
            agente_id 
        };
        
        const casoCriado = await casosRepository.create(casoNovo);
        return res.status(201).json(casoCriado[0]);
    } catch (error) {
        console.error('Erro ao criar caso:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function getCasoById(req, res) {
    try {
        const { id } = req.params;

        const caso = await casosRepository.findById(id);

        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado." });
        }
        
        return res.status(200).json(caso);
    } catch (error) {
        console.error('Erro ao buscar caso por ID:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function updateCaso(req, res) {
    try {
        const { id } = req.params;

        const { titulo, descricao, status, agente_id } = req.body;

        if (!titulo || !descricao || !status || !agente_id) {
            return res.status(400).json({ message: "Todos os campos precisam ser preenchidos" });
        }

        const statusValido = ["aberto", "solucionado", "arquivado"];

        if(!statusValido.includes(status.toLowerCase())) {
            return res.status(400).json({
                message: "Status inválido. Use 'aberto', 'solucionado' ou 'arquivado'."
            });
        }

        // Verificar se o agente existe
        const agenteExiste = await agentesRepository.findById(agente_id);
        if (!agenteExiste) {
            return res.status(400).json({ message: "Agente não encontrado" });
        }

        const updated = await casosRepository.update(id, { 
            titulo, 
            descricao, 
            status: status.toLowerCase(), 
            agente_id 
        });

        if (!updated || updated.length === 0) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        return res.status(200).json(updated[0]);
    } catch (error) {
        console.error('Erro ao atualizar caso:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function patchCaso(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData.status) {
            const statusValido = ["aberto", "solucionado", "arquivado"];

            if (!statusValido.includes(updateData.status.toLowerCase())) {
                return res.status(400).json({
                    message: "Status inválido. Use 'aberto' , 'solucionado' ou 'arquivado'."
                });
            }

            updateData.status = updateData.status.toLowerCase();
        }

        // Verificar se o agente existe, se for fornecido
        if (updateData.agente_id) {
            const agenteExiste = await agentesRepository.findById(updateData.agente_id);
            if (!agenteExiste) {
                return res.status(400).json({ message: "Agente não encontrado" });
            }
        }

        const updated = await casosRepository.partialUpdate(id, updateData);

        if (!updated || updated.length === 0) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        return res.status(200).json(updated[0]);
    } catch (error) {
        console.error('Erro ao atualizar parcialmente caso:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function deleteCaso(req, res) {
    try {
        const { id } = req.params;

        const deleted = await casosRepository.remove(id);

        if (!deleted) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        return res.status(204).end();
    } catch (error) {
        console.error('Erro ao deletar caso:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function getCasosByAgente(req, res) {
    try {
        const { agente_id } = req.query;
        const casos = await casosRepository.findByAgenteId(agente_id);
        res.status(200).json(casos);
    } catch (error) {
        console.error('Erro ao buscar casos por agente:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function getCasosByStatus(req, res) {
    try {
        const { status } = req.query;
        const casos = await casosRepository.findAll();
        const filteredCasos = casos.filter(caso => caso.status === status);
        res.status(200).json(filteredCasos);
    } catch (error) {
        console.error('Erro ao buscar casos por status:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
}

async function searchCasos(req, res) {
    try {
        const { q } = req.query;
        const casos = await casosRepository.findAll();
        const filteredCasos = casos.filter(caso => 
            caso.titulo.includes(q) || caso.descricao.includes(q)
        );
        res.status(200).json(filteredCasos);
    } catch (error) {
        console.error('Erro ao pesquisar casos:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
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