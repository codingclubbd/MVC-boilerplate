
const verifyOTP = require('../../controllers/authentication/verifyOTP');
const decorateHTMLResponse = require('../../middlewares/common/decorateHTMLResponse');

const verifyOTPRoute = require('express').Router()

// verify OTP post route
verifyOTPRoute.post('/', decorateHTMLResponse(`Verify OTP`) ,verifyOTP)


//export
module.exports = verifyOTPRoute;