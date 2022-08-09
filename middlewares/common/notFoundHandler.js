/* dependencies */
const createHttpError = require("http-errors");


/* not found handler */
function notFoundHandler(req, res) {
  throw createHttpError(404, "Your requested page was not found!");
}

// exports
module.exports = notFoundHandler;