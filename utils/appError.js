class AppError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors.map((err) => err.msg || err);
    }
}

module.exports = AppError;
