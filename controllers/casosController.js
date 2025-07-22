const repository = require("../repositories/casosRepository");
const { casoSchema, idSchema } = require("../utils/validationSchemas");

const getAllCasos = (req, res) => {
  res.status(200).json(repository.findAll());
};

const getCasoById = (req, res, next) => {
  const id = idSchema.parse(req.params.id);
  const caso = repository.findById(id);
  if (!caso) return next({ message: "Caso não encontrado", statusCode: 404 });
  res.status(200).json(caso);
};

const createCaso = (req, res, next) => {
  try {
    const data = casoSchema.parse(req.body);
    const novo = repository.create(data);
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
};

const updateCaso = (req, res, next) => {
  try {
    const id = idSchema.parse(req.params.id);
    const data = casoSchema.partial().parse(req.body);
    const atualizado = repository.update(id, data);
    if (!atualizado)
      return next({ message: "Caso não encontrado", statusCode: 404 });
    res.status(200).json(atualizado);
  } catch (err) {
    next(err);
  }
};

const deleteCaso = (req, res, next) => {
  const id = idSchema.parse(req.params.id);
  const success = repository.remove(id);
  if (!success)
    return next({ message: "Caso não encontrado", statusCode: 404 });
  res.status(204).send();
};

module.exports = {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  deleteCaso,
};
