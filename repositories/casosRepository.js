const { v4: uuidv4 } = require('uuid');

const casos = [];

function findAll() {
    return casos;
}

function findById(id) {
    const caso = casos.find((caso) => caso.id === id);
    return caso;
}

function create(caso) {
    caso.id = uuidv4();
    casos.push(caso);
    return caso;
}

function update(id, updatedCaso) {
    const caso = casos.find((caso) => caso.id === id);

    if (!caso) {
        return null;
    }

    caso.titulo = updatedCaso.titulo;
    caso.descricao = updatedCaso.descricao;
    caso.status = updatedCaso.status;
    caso.agente_id = updatedCaso.agente_id;

    return caso;
}

function updatePartial(id, partialCaso) {
    const caso = casos.find((caso) => caso.id === id);

    if (!caso) {
        return null;
    }

    if (partialCaso.titulo !== undefined) {
        caso.titulo = partialCaso.titulo;
    }

    if (partialCaso.descricao !== undefined) {
        caso.descricao = partialCaso.descricao;
    }

    if (partialCaso.status !== undefined) {
        caso.status = partialCaso.status;
    }

    if (partialCaso.agente_id !== undefined) {
        caso.agente_id = partialCaso.agente_id;
    }

    return caso;
}

function remove(id) {
    const index = casos.findIndex((caso) => caso.id === id);

    if (index !== -1) {
        casos.splice(index, 1);
        return true;
    }

    return false;
}

function getByAgenteId(agenteId) {
    return casos.filter((caso) => caso.agente_id === agenteId);
}

function getByStatus(status) {
    return casos.filter((caso) => caso.status === status);
}

function getByAgenteIdAndStatus(agenteId, status) {
    return casos.filter((caso) => caso.agente_id === agenteId && caso.status === status);
}

function filter(term) {
    if (!term) {
        return [];
    }

    return casos.filter(
        (caso) =>
            caso.titulo.toLowerCase().includes(term.toLowerCase()) ||
            caso.descricao.toLowerCase().includes(term.toLowerCase())
    );
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    updatePartial,
    remove,
    getByAgenteId,
    getByStatus,
    filter,
    getByAgenteIdAndStatus,
};
