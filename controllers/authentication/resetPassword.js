//dependencies
const User = require("../../models/User");
const sendEmailToUser = require("../../utilities/sendEmailToUser");
const path = require('path');
const OTP = require("../../models/OTP");
const { sign } = require("jsonwebtoken");
require('dotenv').config()



//forget password handler
const resetPassword = async (req, res) => {
    const queryVal = req.body.username;
    try {
        const user = await User.findOne({
            $or: [{
                    email: queryVal
                },
                {
                    username: queryVal
                }
            ]
        }, {email:1});


        if (user) {

            const otpObj = new OTP({
                OTP: Math.floor(1000 + Math.random() * 9000),
                email: user.email,
                expireIn: Date.now() + 120010,
            })

            const otp = await otpObj.save()



         await sendEmailToUser([user.email], {
            subject:"Reset Your password",
            template: `Your OTP is : ${otp.OTP}`,
            attachments: []
         }, function (err, info) {

           

               if(info?.messageId){
                res.render('pages/auth/verifyOtp', {error:{}, otp:{value:null,otpId: otp._id}});
               }else{
                throw err;
               }
            })

        } else {
            res.render('pages/auth/resetPassword', {error:{
                username: {
                    msg: "User not found!"
                }
            },
        username: queryVal
        })
        }


    } catch (error) {
        throw error;
    }
}

//export
module.exports = resetPassword;