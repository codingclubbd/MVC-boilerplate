// dependencies
const { Router } = require('express');
require('dotenv').config()

const getRegisterPage = require('../../controllers/authentication/getRegisterPage');
const registerController = require('../../controllers/authentication/registerController');
const checkLogin = require('../../middlewares/authentication/checkLogin');
const registerDataValidatorResult = require('../../middlewares/authentication/registerDataValidatorResult');
const registerDataValidators = require('../../middlewares/authentication/registerDataValidators');
const decorateHTMLResponse = require('../../middlewares/common/decorateHTMLResponse');



//register initialize
const registerRoute = Router();

// get register page route
registerRoute.get(
    "/",
    decorateHTMLResponse(`Registration - ${process.env.APP_NAME}`),
    checkLogin,
    getRegisterPage 
)


//register handler route
registerRoute.post(
    '/',
    decorateHTMLResponse(`Registration - ${process.env.APP_NAME}`),
    registerDataValidators,
    registerDataValidatorResult, 
    registerController
    )


//export
module.exports = registerRoute;