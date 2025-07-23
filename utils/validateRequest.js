import { validationResult } from 'express-validator';
import AppError from './appError.js';

export default function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const mensagens = errors.array().map((err) => err.msg);
        throw new AppError(400, 'Parâmetros inválidos', mensagens);
    }
    next();
}
