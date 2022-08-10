const emailConfirmation = require("../../controllers/authentication/emailConfirmation");
const decorateHTMLResponse = require("../../middlewares/common/decorateHTMLResponse");
require("dotenv").config();

//dependencies
const emailConfirmationRoute = require("express").Router();

emailConfirmationRoute.get(
  "/:id",
  decorateHTMLResponse(`Confirmation - ${process.env.APP_NAME}`),
  emailConfirmation
);

//export
module.exports = emailConfirmationRoute;
