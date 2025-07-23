const { body } = require("express-validator");

function createInputValidator() {
  return [
    body("titulo").notEmpty().withMessage("O título é obrigatório"),
    body("descricao").notEmpty().withMessage("A descrição é obrigatória"),
    body("status")
      .notEmpty()
      .withMessage("O status é obrigatório")
      .isIn(["aberto", "solucionado"])
      .withMessage('O status deve ser "aberto" ou "solucionado"'),
  ];
}

function createPartialInputValidator() {
  return [
    body("titulo")
      .optional()
      .notEmpty()
      .withMessage("O título não pode ser vazio"),
    body("descricao")
      .optional()
      .notEmpty()
      .withMessage("A descrição não pode ser vazia"),
    body("status")
      .optional()
      .isIn(["aberto", "solucionado"])
      .withMessage('O status deve ser "aberto" ou "solucionado"'),
    body("agente_id")
      .optional()
      .notEmpty()
      .withMessage("O identificador do agente responsável não pode ser vazio"),
  ];
}

module.exports = {
  createInputValidator,
  createPartialInputValidator,
};