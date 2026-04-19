// Express identifica 4 parâmetros de injestão como sendo Error Handler estrito
const errorHandler = (err, req, res, next) => {
  // Se o servidor Express já engrenou os headers para o browser local, delegamos finalização pra não colapsar memória
  if (res.headersSent) {
    return next(err);
  }

  // Auditar silenciosamente em tela para devs
  console.error('[Global Error Logger]:', err.message || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro Crítico Interno no Servidor API';

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
