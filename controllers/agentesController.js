const agentesRepository = require('../repositories/agentesRepository');
const AppError = require('../utils/appError');

function getAllAgentes(req, res) {
    const cargo = req.query.cargo;
    const sort = req.query.sort;

    if (cargo && sort) {
        if (sort === 'dataDeIncorporacao') {
            const agentes = agentesRepository.getByCargoAndSort(cargo, false);
            return res.json(agentes);
        } else if (sort === '-dataDeIncorporacao') {
            const agentes = agentesRepository.getByCargoAndSort(cargo, true);
            return res.json(agentes);
        } else {
            throw new AppError(400, 'Parâmetro de ordenação inválido');
        }
    }

    if (cargo && !sort) {
        const agentes = agentesRepository.getByCargo(cargo);
        if (!agentes || agentes.length === 0) {
            throw new AppError(404, 'Nenhum agente encontrado com o cargo especificado');
        }
        return res.json(agentes);
    }

    if (sort && !cargo) {
        if (sort === 'dataDeIncorporacao') {
            const agentes = agentesRepository.getSortedByDataDeIncorporacao();
            return res.json(agentes);
        } else if (sort === '-dataDeIncorporacao') {
            const agentes = agentesRepository.getSortedByDataDeIncorporacao(true);
            return res.json(agentes);
        } else {
            throw new AppError(400, 'Parâmetro de ordenação inválido');
        }
    }

    const agentes = agentesRepository.findAll();
    res.json(agentes);
}

function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        throw new AppError(404, 'Nenhum agente encontrado para o id especificado');
    }
    res.json(agente);
}

function createAgente(req, res) {
    const novoAgente = agentesRepository.create(req.body);
    res.status(201).json(novoAgente);
}

function updateAgente(req, res) {
    const id = req.params.id;

    if (req.body.id) {
        throw new AppError(400, 'Parâmetros inválidos', ['O id não pode ser atualizado']);
    }

    const agente = agentesRepository.findById(id);
    if (!agente) {
        throw new AppError(404, 'Nenhum agente encontrado para o id especificado');
    }

    const updatedAgente = agentesRepository.update(id, req.body);
    res.status(200).json(updatedAgente);
}

function updatePartialAgente(req, res) {
    const id = req.params.id;

    if (!req.body || Object.keys(req.body).length === 0) {
        throw new AppError(400, 'Parâmetros inválidos', ['O corpo da requisição está vazio']);
    }

    if (req.body.id) {
        throw new AppError(400, 'Parâmetros inválidos', ['O id não pode ser atualizado']);
    }

    // Validações adicionais para garantir que os dados sejam válidos
    const invalidFields = [];
    
    if (req.body.nome !== undefined && (typeof req.body.nome !== 'string' || req.body.nome.trim() === '')) {
        invalidFields.push('O nome deve ser uma string não vazia');
    }
    
    if (req.body.cargo !== undefined && (typeof req.body.cargo !== 'string' || req.body.cargo.trim() === '')) {
        invalidFields.push('O cargo deve ser uma string não vazia');
    }
    
    if (req.body.dataDeIncorporacao !== undefined) {
        if (typeof req.body.dataDeIncorporacao !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(req.body.dataDeIncorporacao)) {
            invalidFields.push('A data de incorporação deve estar no formato YYYY-MM-DD');
        } else {
            const inputDate = new Date(req.body.dataDeIncorporacao);
            const now = new Date();
            if (inputDate > now) {
                invalidFields.push('A data não pode estar no futuro');
            }
        }
    }
    
    if (invalidFields.length > 0) {
        throw new AppError(400, 'Parâmetros inválidos', invalidFields);
    }

    const agente = agentesRepository.findById(id);
    if (!agente) {
        throw new AppError(404, 'Nenhum agente encontrado para o id especificado');
    }

    const updatedAgente = agentesRepository.updatePartial(id, req.body);
    res.status(200).json(updatedAgente);
}

function deleteAgente(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        throw new AppError(404, 'Nenhum agente encontrado para o id especificado');
    }
    const deleted = agentesRepository.remove(id);
    if (!deleted) {
        throw new AppError(404, 'Nenhum agente encontrado para o id especificado');
    }
    res.status(204).send();
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    createAgente,
    updateAgente,
    updatePartialAgente,
    deleteAgente,
};
