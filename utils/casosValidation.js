const { body } = require('express-validator');

function createInputValidator() {
    return [
        body('titulo')
            .notEmpty()
            .withMessage('O título é obrigatório')
            .isString()
            .withMessage('O título deve ser uma string'),
        body('descricao')
            .notEmpty()
            .withMessage('A descrição é obrigatória')
            .isString()
            .withMessage('A descrição deve ser uma string'),
        body('status')
            .notEmpty()
            .withMessage('O status é obrigatório')
            .isIn(['aberto', 'solucionado'])
            .withMessage('O status deve ser "aberto" ou "solucionado"'),
        body('agente_id')
            .notEmpty()
            .withMessage('O identificador do agente responsável é obrigatório')
            .isUUID()
            .withMessage('O identificador do agente responsável deve ser um UUID válido'),
        body('id')
            .optional()
            .custom(() => {
                throw new Error('O id não pode ser fornecido');
            }),
    ];
}

function createPartialInputValidator() {
    return [
        body('titulo')
            .optional()
            .notEmpty()
            .withMessage('O título não pode ser vazio')
            .isString()
            .withMessage('O título deve ser uma string'),
        body('descricao')
            .optional()
            .notEmpty()
            .withMessage('A descrição não pode ser vazia')
            .isString()
            .withMessage('A descrição deve ser uma string'),
        body('status')
            .optional()
            .isIn(['aberto', 'solucionado'])
            .withMessage('O status deve ser "aberto" ou "solucionado"'),
        body('agente_id')
            .optional()
            .notEmpty()
            .withMessage('O identificador do agente responsável não pode ser vazio')
            .isUUID()
            .withMessage('O identificador do agente responsável deve ser um UUID válido'),
        body('id')
            .optional()
            .custom(() => {
                throw new Error('O id não pode ser atualizado');
            }),
    ];
}

module.exports = {
    createInputValidator,
    createPartialInputValidator,
};
