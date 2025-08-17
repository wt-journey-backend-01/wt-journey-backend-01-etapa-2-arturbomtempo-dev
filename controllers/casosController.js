const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { AppError } = require('../utils/errorHandler');

function getAllCasos(req, res) {
    const agenteId = req.query.agente_id;
    const status = req.query.status;

    if (agenteId && status) {
        const casos = casosRepository.getByAgenteIdAndStatus(agenteId, status);

        if (!casos || casos.length === 0) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        return res.json(casos);
    }

    if (agenteId) {
        const casos = casosRepository.getByAgenteId(agenteId);

        if (!casos || casos.length === 0) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        return res.json(casos);
    }

    if (status) {
        const casos = casosRepository.getByStatus(status);

        if (!casos || casos.length === 0) {
            throw new AppError(404, 'Caso não encontrado.');
        }

        return res.json(casos);
    }

    const casos = casosRepository.findAll();

    res.json(casos);
}

function getCasosById(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);

    if (!caso) {
        throw new AppError(404, 'Caso não encontrado.');
    }

    res.json(caso);
}

function createCaso(req, res) {
    const agenteId = req.body.agente_id;

    if (agenteId) {
        const agente = agentesRepository.findById(agenteId);

        if (!agente) {
            throw new AppError(404, 'Agente não encontrado.');
        }
    } else {
        throw new AppError(404, 'Agente não encontrado.');
    }

    const novoCaso = casosRepository.create(req.body);

    res.status(201).json(novoCaso);
}

function updateCaso(req, res) {
    const id = req.params.id;
    const agenteId = req.body.agente_id;

    if (agenteId) {
        const agente = agentesRepository.findById(agenteId);

        if (!agente) {
            throw new AppError(404, 'Agente não encontrado.');
        }
    } else {
        throw new AppError(404, 'Agente não encontrado.');
    }

    const caso = casosRepository.findById(id);

    if (!caso) {
        throw new AppError(404, 'Caso não encontrado.');
    }

    const updatedCaso = casosRepository.update(id, req.body);

    res.status(200).json(updatedCaso);
}

function updatePartialCaso(req, res) {
    const id = req.params.id;

    if (req.body.id) {
        throw new AppError(400, 'Parâmetro inválido.', ['O id não pode ser atualizado.']);
    }

    const agenteId = req.body.agente_id;

    if (agenteId) {
        const agente = agentesRepository.findById(agenteId);

        if (!agente) {
            throw new AppError(404, 'Agente não encontrado.');
        }
    }

    const caso = casosRepository.findById(id);

    if (!caso) {
        throw new AppError(404, 'Caso não encontrado.');
    }

    const updatedCaso = casosRepository.updatePartial(id, req.body);

    res.status(200).json(updatedCaso);
}

function deleteCaso(req, res) {
    const id = req.params.id;
    const deleted = casosRepository.remove(id);

    if (!deleted) {
        throw new AppError(404, 'Caso não encontrado.');
    }

    res.status(204).send();
}

function getAgenteByCasoId(req, res) {
    const casoId = req.params.caso_id;
    const caso = casosRepository.findById(casoId);

    if (!caso) {
        throw new AppError(404, 'Caso não encontrado.');
    }

    const agenteId = caso.agente_id;
    const agente = agentesRepository.findById(agenteId);

    if (!agente) {
        throw new AppError(404, 'Agente não encontrado.');
    }

    res.status(200).json(agente);
}

function filter(req, res) {
    const term = req.query.q;
    const casos = casosRepository.filter(term);

    if (casos.length === 0) {
        throw new AppError(404, 'Caso não encontrado.');
    }

    res.json(casos);
}

module.exports = {
    getAllCasos,
    getCasosById,
    createCaso,
    updateCaso,
    updatePartialCaso,
    deleteCaso,
    getAgenteByCasoId,
    filter,
};
