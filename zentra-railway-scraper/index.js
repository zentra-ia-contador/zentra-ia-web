const express = require('express');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('./src/middleware/auth');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
const startTime = Date.now();

app.use(express.json({ limit: '1mb' }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
  })
);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

app.use(authMiddleware);
app.use('/api', routes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, _req, res, _next) => {
  console.error('[server]', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`ZENTRA scraper escuchando en puerto ${PORT} (PID ${process.pid}, started ${new Date(startTime).toISOString()})`);
});
