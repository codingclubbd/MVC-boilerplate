//dependencies
require('dotenv').config()

const resetPassword = require('../../controllers/authentication/resetPassword');
const getResetPasswordPage = require('../../controllers/authentication/getResetPasswordPage');
const decorateHTMLResponse = require('../../middlewares/common/decorateHTMLResponse');


//forget password route
const resetPasswordRoute = require('express').Router();

// forgot password handler
resetPasswordRoute.post('/',decorateHTMLResponse(`Reset Password - ${process.env.APP_NAME}`),  resetPassword)

// forgot password page
resetPasswordRoute.get('/', decorateHTMLResponse(`Reset Password - ${process.env.APP_NAME}`), getResetPasswordPage)


//export
module.exports = resetPasswordRoute;