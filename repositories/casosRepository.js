const { v4: uuidv4 } = require('uuid');

const casos = [];

function findAll() {
  return casos;
}

function findById(id) {
  return casos.find(c => c.id === id);
}

function create(data) {
  const novo = { id: uuidv4(), ...data };
  casos.push(novo);
  return novo;
}

function update(id, data) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return null;
  casos[index] = { ...casos[index], ...data };
  return casos[index];
}

function remove(id) {
  const index = casos.findIndex(c => c.id === id);
  if (index === -1) return false;
  casos.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };