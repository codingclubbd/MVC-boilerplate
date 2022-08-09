//dependencies
const {
    Router
} = require('express');
const getLoginPage = require('../../controllers/authentication/getLoginPage');
const loginController = require('../../controllers/authentication/loginController');
const checkLogin = require('../../middlewares/authentication/checkLogin');
const loginDataValidatorResult = require('../../middlewares/authentication/loginDataValidatorResult');
const loginDataValidators = require('../../middlewares/authentication/loginDataValidators');
const decorateHTMLResponse = require('../../middlewares/common/decorateHTMLResponse');

//initialize login route
const loginRoute = Router();

// get login page route
loginRoute.get(
    "/",
    decorateHTMLResponse(`Login - ${process.env.APP_NAME}`),
    checkLogin,
    getLoginPage
)


//login handler route
loginRoute.post(
    '/',
    decorateHTMLResponse(`Login - ${process.env.APP_NAME}`),
    loginDataValidators,
    loginDataValidatorResult,
    loginController
);


//export
module.exports = loginRoute;