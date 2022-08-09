// dependencies

const createHttpError = require("http-errors");
const User = require("../../models/User");
const hashStr = require("../../utilities/hashStr");


// register controller
const registerController = async (req, res) =>{

  const {firstName, lastName, email, username, password} = req.body;
    try {
     const userObj =   new User({
        firstName,
        lastName,
        username,
        email,
        password: await hashStr(password),
        role: "customer"
     });
     
     const user = await userObj.save()

     return res.redirect('/login?registration=done')
        
    } catch (error) {
        throw createHttpError(500, error);
    }

}

//exports 
module.exports = registerController;