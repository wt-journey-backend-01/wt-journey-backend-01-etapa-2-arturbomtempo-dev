const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    const errors = err.errors.map(e => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      status: 400,
      message: 'Parâmetros inválidos',
      errors,
    });
  }

  res.status(err.statusCode || 500).json({
    status: err.statusCode || 500,
    message: err.message || 'Erro interno no servidor',
  });
};

module.exports = errorHandler;