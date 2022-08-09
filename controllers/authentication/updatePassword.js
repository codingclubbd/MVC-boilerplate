const createHttpError = require("http-errors");
const OTP = require("../../models/OTP");
const User = require("../../models/User");
const hashStr = require("../../utilities/hashStr");
const jwt = require('jsonwebtoken');
require('dotenv').config()

const updatePassword = async (req, res) => {
    try {
        const otpId = req.body.otpId;
        const otp = req.body.otp;
        const password = req.password;

        const otpObj = await OTP.findOne({_id:otpId});

        if(Number(otp) === otpObj.OTP && otpObj.status){
            const hashedPassword = await hashStr(password);
            const result = await User.findOneAndUpdate({email: otpObj.email},{
                $set:{
                    password: hashedPassword
                }
            })
            if(result){

                const token = await jwt.sign({
                    username: result.username,
                    email: result.email
                }, process.env.JWT_SECRET,{expiresIn: '1h'})
                
                res.status(200)
                res.cookie("access_token", "Bearer " +  token, {signed: true});
    
                res.redirect('/')

            }else{
                throw createHttpError(500,'Internal Server error');
            }

        }else{
            throw createHttpError(500,'Internal Server error');
        }

    } catch (error) {
        throw error;
    }


}

module.exports = updatePassword;