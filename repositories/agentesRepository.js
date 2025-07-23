const agentes = [];

function findAll() {
    return agentes;
}
function findById(id) {
    const agente = agentes.find((a) => a.id === id);
    return agente;
}

function criarAgente(agente) {
    agentes.push(agente);
}

function updateAgente(id, dadosAtualizados) {
    const index = agentes.findIndex((a) => a.id === id);
    if (index !== -1) {
        agentes[index] = { ...agentes[index], ...dadosAtualizados };
        return agentes[index];
    }
    return null;
}

function deleteAgente(id) {
    const index = agentes.findIndex((a) => a.id === id);
    if (index !== -1) {
        agentes.splice(index, 1);
        return true;
    }
    return false;
}

module.exports = {
    findAll,
    findById,
    criarAgente,
    updateAgente,
    deleteAgente,
};
