import { body } from 'express-validator';

const futureDateValidation = (value) => {
    const now = new Date();
    const inputDate = new Date(value);
    if (inputDate > now) {
        throw new Error('A data não pode estar no futuro');
    }
    return true;
};

function createInputValidator() {
    return [
        body('nome').notEmpty().withMessage('O nome é obrigatório'),
        body('dataDeIncorporacao')
            .notEmpty()
            .withMessage('A data de incorporação é obrigatória')
            .matches(/^\d{4}-\d{2}-\d{2}$/)
            .withMessage('A data de incorporação deve estar no formato YYYY-MM-DD')
            .custom(futureDateValidation),
        body('cargo').notEmpty().withMessage('O cargo é obrigatório'),
    ];
}

function createPartialInputValidator() {
    return [
        body('nome').optional().isString().notEmpty().withMessage('O nome não pode ser vazio'),
        body('cargo').optional().isString().notEmpty().withMessage('O cargo não pode ser vazio'),
        body('dataDeIncorporacao')
            .optional()
            .isISO8601()
            .toDate()
            .withMessage('A data de incorporação deve ser uma data válida'),
    ];
}

export {
    createInputValidator,
    createPartialInputValidator,
};
