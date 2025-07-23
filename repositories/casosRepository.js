const casos = [];

function findAll() {
    return casos;
}
function findById(id) {
    const caso = casos.find((a) => a.id === id);
    return caso;
}

function criarCaso(caso) {
    casos.push(caso);
}

function deleteCaso(id) {
    const index = casos.findIndex((c) => c.id === id);
    if (index !== -1) {
        casos.splice(index, 1);
        return true;
    }
    return false;
}

function buscaPalavraEmCaso(palavraChave) {
    const casosFiltrados = casos.filter((caso) => {
        const titulo = caso.titulo ? caso.titulo.toLowerCase() : '';
        const descricao = caso.descricao ? caso.descricao.toLowerCase() : '';

        return titulo.includes(palavraChave) || descricao.includes(palavraChave);
    });
    return casosFiltrados;
}

module.exports = {
    findAll,
    findById,
    criarCaso,
    deleteCaso,
    buscaPalavraEmCaso,
};
