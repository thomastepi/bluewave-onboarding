const app = require("./src/server");

function handler(req, res) {
  return app(req, res);
}

module.exports = handler;
