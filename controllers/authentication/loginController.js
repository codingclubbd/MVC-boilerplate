// dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const createHttpError = require("http-errors");


//login controller
const loginController = async (req, res) =>{
    try {
        if(req.validUser){
            const token = await jwt.sign({
                username: req.username,
                email: req.email
            }, process.env.JWT_SECRET,{expiresIn: '1h'})
            
            res.status(200)
            res.cookie("access_token", "Bearer " +  token, {signed: true});

            res.redirect('/')
        }else{
            res.send('Something went wrong!')
        }
        
    } catch (error) {
        throw createHttpError(error)
    }
}


//export
module.exports = loginController;