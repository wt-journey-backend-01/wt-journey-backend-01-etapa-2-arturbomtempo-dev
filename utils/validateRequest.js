import { validationResult } from 'express-validator';
import AppError from './appError.js';

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError(400, 'Parâmetros inválidos', errors.array());
    }
    next();
}

export default validateRequest;
