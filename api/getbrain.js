// const server = require('./server');

// module.exports = server;

const express = require('express');
const router = express.Router();

router.get('/getbrain', (req, res) => {
  res.json({ message: 'Data from the server' });
});

module.exports = router;