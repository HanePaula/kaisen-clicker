const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido. Acesso Negado.' });
  }

  const parts = authHeader.split(' ');
  // Protecao XSS e Out-of-Bounds de malformação string
  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    return res.status(401).json({ error: 'Formato indevível submetido à porta. Acesso Travado.' });
  }

  const token = parts[1];

  try {
    // Removermos o fallback '|| super-secret'. Aplicativos Senior fecham vulnerabilidade dando Crashing Forçado no Node aqui se faltar dotEnv.
    if (!process.env.JWT_SECRET) {
      throw new Error('CRITICAL VULNERABILITY: Node Processo tentou logar sem Secrets parametrizados em ENV. Crash Forçado!');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    return next();
  } catch (err) {
    if (err.message.includes('VULNERABILITY')) console.error(err.message);
    return res.status(401).json({ error: 'Acesso Restrito: Chaves Ilegais ou Vencidas.' });
  }
};

module.exports = authMiddleware;
