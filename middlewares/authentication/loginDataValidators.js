//dependencies
const User = require("../../models/User");
const {
    check
} = require('express-validator')
const bcrypt = require("bcrypt");

//login validator
const loginDataValidators = [
    // username validator
    check('username')
    .toLowerCase()
    .custom(async (value, {
        req
    }) => {
        try {
            const user = await User.findOne({
                $or: [{
                        username: value
                    },
                    {
                        email: value
                    }
                ]
            }, {
                username: 1,
                email: 1,
                password: 1
            });

            if (user) {
                req.username = user.username;
                req.email = user.email;
                req.password = user.password;

                return Promise.resolve()
            } else {
               return Promise.reject()
            }

        } catch (error) {
            throw createHttpError(500, error);
        }
    })
    .withMessage('User was not found!'),

    // password validator
    check('password')
    .custom(async (password, {
        req
    }) => {
        if(!req.password) return true;
        try {
            const isValidUser = await bcrypt.compare(password, req.password);
            if (isValidUser) {
                req.validUser = true
                return Promise.resolve()
            } else {
                return Promise.reject()
            }

        } catch (error) {
           throw createHttpError(500, error);
        }
    })
    .withMessage("Password was wrong!")
]

//export
module.exports = loginDataValidators;