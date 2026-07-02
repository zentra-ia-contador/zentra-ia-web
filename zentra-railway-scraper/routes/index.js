const express = require('express');
const declarationQueue = require('../src/queue/declarationQueue');

const router = express.Router();

router.get('/queue/status', (_req, res) => {
  res.json({
    pending: declarationQueue.size,
    active: declarationQueue.pending,
    concurrency: declarationQueue.concurrency,
  });
});

module.exports = router;
