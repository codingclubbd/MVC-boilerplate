// dependencies


const updatePassword = require('../../controllers/authentication/updatePassword');
const updatePasswordDataValidatorResult = require('../../middlewares/authentication/updatePasswordDataValidatorResult');
const updatePasswordDataValidators = require('../../middlewares/authentication/updatePasswordDataValidators');
const decorateHTMLResponse = require('../../middlewares/common/decorateHTMLResponse');


const createNewPasswordRoute = require('express').Router()

//post create new password route
createNewPasswordRoute.post('/', 
decorateHTMLResponse("Create new pass"),
updatePasswordDataValidators,
updatePasswordDataValidatorResult,
updatePassword )

//export
module.exports = createNewPasswordRoute;