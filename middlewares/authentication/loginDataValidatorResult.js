// dependencies
const {
    validationResult
} = require("express-validator");

// login data validator results
const loginDataValidatorResult = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        res.render('pages/auth/login', {
            error: mappedErrors,
            username: req.body.username,
            registration:null
        });
    }
}


// exports
module.exports = loginDataValidatorResult;