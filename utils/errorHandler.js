function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Ocorreu um erro interno no servidor.',
    // Em ambiente de desenvolvimento, pode ser útil enviar o stack trace.
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = errorHandler;