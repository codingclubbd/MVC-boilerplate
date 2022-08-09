// dependencies
const getIndexRoute = require('express').Router();
require('dotenv').config()
const getIndexPage = require('../../controllers/home/getIndexPage');
const checkLogin = require('../../middlewares/authentication/checkLogin');
const decorateHTMLResponse = require('../../middlewares/common/decorateHTMLResponse');


//index page 
getIndexRoute.get(
    '/', 
    decorateHTMLResponse(`Home - ${process.env.APP_NAME}`), 
    checkLogin,
    getIndexPage
    )


//export
module.exports = getIndexRoute;