
//dependencies
const { check } = require("express-validator");
const User = require('../../models/User');


const registerDataValidators = [
    //  first name
    check('firstName')
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name is required!")
    ,
    // username
    check("username")
    .trim()
    .isLength({min:6})
    .withMessage("Min 6 character required!")
    .custom(async (value)=>{
      try {
        const user = await User.findOne({username: value}, {username: 1});
        if(user){
          return Promise.reject();
        }else{
          return Promise.resolve();
        }
      } catch (error) {
       throw createHttpError(500, error);
      }
    })
    .withMessage("username already in use!"),

    // email
    check("email")
    .toLowerCase()
    .trim()
    .isEmail()
    .withMessage("Email is invalid!")
    .custom( async (value, {req})=>{
        try {
            const user = await User.findOne({email: value}, {email: 1});
            if(user){
              return Promise.reject();
            }else{
              return true
            }
          } catch (error) {
           throw createHttpError(500, error);
          }
    })
    .withMessage("Email already in use!")
,
    // password
    check('password')
    .isStrongPassword()
    .withMessage("Password is not strong!")
    .custom((value, {req}) => {
      req.password = value;
      return true;
    }),

    // confirm password
    check('confirmPassword')
    .isStrongPassword()
    .withMessage("Password is not strong!")
    .custom((val, {req}) => {
      if(req.password === val) return true;
      return false;
    })
    .withMessage("Password doesn't match!")



]


//export
module.exports = registerDataValidators;