const express = require('express');
const router = express.Router();
const logger = require('../../logger');

router.get('/transactions', (req, res) => {
  logger.log('info', '%s', req.originalUrl);

  res.send(require('../../transactions.json'));
});

module.exports = router;
