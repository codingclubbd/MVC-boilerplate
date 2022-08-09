// dependencies

const checkEmail = require('../../APIs/auth/checkEmail');
const checkUsername = require('../../APIs/auth/checkUsername');

// auth api route
const authAPIsRoute = require('express').Router();

//check username
authAPIsRoute.get("/checkUsername/:username", checkUsername );

//check username
authAPIsRoute.get("/checkEmail/:email", checkEmail );

//exports
module.exports = authAPIsRoute;