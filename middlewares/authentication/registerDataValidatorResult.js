//dependencies
const { validationResult } = require('express-validator')


//user validator
const registerDataValidatorResult = (req, res, next)=>{
    const errors = validationResult(req);
    const mappedErrors =errors.mapped();
    const user = req.body;

 if(Object.keys(mappedErrors).length === 0){
    next()
 }else{
   res.render('pages/auth/register', { error: mappedErrors , user})
 }

}

//export
module.exports = registerDataValidatorResult;