const { param } = require('express-validator');

function validateUUIDParam(paramName) {
    return param(paramName)
        .isUUID()
        .withMessage(`O parâmetro "${paramName}" deve ser um UUID válido`);
}

module.exports = {
    validateUUIDParam,
};
