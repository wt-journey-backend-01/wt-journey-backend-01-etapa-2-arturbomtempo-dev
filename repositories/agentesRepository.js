const { v4: uuidv4 } = require('uuid');

const agentes = [];

function findAll() {
  return agentes;
}

function findById(id) {
  return agentes.find(a => a.id === id);
}

function create(data) {
  const novo = { id: uuidv4(), ...data };
  agentes.push(novo);
  return novo;
}

function update(id, data) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return null;
  agentes[index] = { ...agentes[index], ...data };
  return agentes[index];
}

function remove(id) {
  const index = agentes.findIndex(a => a.id === id);
  if (index === -1) return false;
  agentes.splice(index, 1);
  return true;
}

module.exports = { findAll, findById, create, update, remove };