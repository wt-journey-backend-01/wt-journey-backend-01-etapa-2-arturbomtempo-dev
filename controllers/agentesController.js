const repository = require("../repositories/agentesRepository");
const { agenteSchema, idSchema } = require("../utils/validationSchemas");

const getAllAgentes = (req, res) => {
  res.status(200).json(repository.findAll());
};

const getAgenteById = (req, res, next) => {
  const id = idSchema.parse(req.params.id);
  const agente = repository.findById(id);
  if (!agente)
    return next({ message: "Agente não encontrado", statusCode: 404 });
  res.status(200).json(agente);
};

const createAgente = (req, res, next) => {
  try {
    const data = agenteSchema.parse(req.body);
    const novo = repository.create(data);
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
};

const updateAgente = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const data = agenteSchema.partial().parse(req.body);
    const atualizado = repository.update(id, data);
    if (!atualizado)
      return next({ message: "Agente não encontrado", statusCode: 404 });
    res.status(200).json(atualizado);
  } catch (err) {
    next(err);
  }
};

const deleteAgente = (req, res, next) => {
  const id = idSchema.parse(req.params.id);
  const success = repository.remove(id);
  if (!success)
    return next({ message: "Agente não encontrado", statusCode: 404 });
  res.status(204).send();
};

module.exports = {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  deleteAgente,
};
