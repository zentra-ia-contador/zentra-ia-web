function authMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const expectedKey = process.env.ZENTRA_API_KEY;

  if (!expectedKey) {
    console.error('[auth] ZENTRA_API_KEY no está configurada');
    return res.status(500).json({ error: 'Servidor mal configurado' });
  }

  if (!apiKey || apiKey !== expectedKey) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  next();
}

module.exports = authMiddleware;
