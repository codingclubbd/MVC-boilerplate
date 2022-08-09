//dependencies
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const OTP = require('../../models/OTP');
require('dotenv').config();

// otp handler
const verifyOTP = async (req, res)=>{
  try {
    const otpInput = req.body?.otp;
    const otpId = req.body?.otpId;
    
    try {

        const otpObj = await OTP.findOne({_id:otpId});

        if(Number(otpInput) === otpObj.OTP && otpObj?.expireIn.getTime() > Date.now()){

            const result = await OTP.findOneAndUpdate({_id:otpObj._id}, {$set: {
                status: true
            }})

            if(result){

                res.render('pages/auth/createNewPassword', {
                    error:{},
                    otp:{
                        otpId: result._id,
                        otp: result.OTP
                    }
                })
            }else{
                throw createHttpError(500,"Internal Server error!")
            }
        }else{
            res.render('pages/auth/verifyOtp', {
                error:{
                    otp:{msg:"Invalid OTP"}
                },
            otp: {
                value: otpInput,
                otpId : otpId
            }
            })
        }


    } catch (err) {
        res.render('pages/auth/verifyOtp', {
            error:{
                otp:{msg:"Invalid OTP"}
            },
        otp: {
            value: otpInput,
            token : otpId
        }
        })
    }

    
  } catch (error) {
        throw error;
  }
}



//export
module.exports = verifyOTP;