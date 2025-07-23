const { v4: uuidv4 } = require('uuid');

const agentes = [];

function findAll() {
    return agentes;
}

function findById(id) {
    const agente = agentes.find((agente) => agente.id === id);
    return agente;
}

function create(agente) {
    agente.id = uuidv4();
    agentes.push(agente);
    return agente;
}

function update(id, updatedAgente) {
    const agente = agentes.find((agente) => agente.id === id);
    agente.nome = updatedAgente.nome;
    agente.cargo = updatedAgente.cargo;
    agente.dataDeIncorporacao = updatedAgente.dataDeIncorporacao;
    return agente;
}

function updatePartial(id, partialAgente) {
    const agente = agentes.find((agente) => agente.id === id);
    if (partialAgente.nome) agente.nome = partialAgente.nome;
    if (partialAgente.cargo) agente.cargo = partialAgente.cargo;
    if (partialAgente.dataDeIncorporacao)
        agente.dataDeIncorporacao = partialAgente.dataDeIncorporacao;
    return agente;
}

function remove(id) {
    const index = agentes.findIndex((agente) => agente.id === id);
    if (index !== -1) {
        agentes.splice(index, 1);
        return true;
    }
    return false;
}

function getByCargo(cargo) {
    return agentes.filter((agente) => agente.cargo === cargo);
}

function getSortedByDataDeIncorporacao(desc) {
    const sortedAgentes = [...agentes].sort(
        (a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
    );
    if (desc) {
        sortedAgentes.reverse();
    }
    return sortedAgentes;
}

function getByCargoAndSort(cargo, desc) {
    let agentesFiltrados = getByCargo(cargo);
    agentesFiltrados = agentesFiltrados.sort(
        (a, b) => new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
    );
    if (desc) {
        agentesFiltrados.reverse();
    }
    return agentesFiltrados;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    updatePartial,
    remove,
    getByCargo,
    getSortedByDataDeIncorporacao,
    getByCargoAndSort,
};
