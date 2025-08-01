const { createServer } = require('http');
const { app } = require('../dist/src/main');

module.exports = createServer((req, res) => {
  app(req, res);
});
