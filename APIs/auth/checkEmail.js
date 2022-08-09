//dependencies

const User = require("../../models/User");


//check email
const checkEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.params.email
        }, {
            _id: true
        })
        if (user) return res.send({
            status:false,
            msg: "Already have an account with this Email"
        });
        return res.send({
            status:true,
            msg: "notExist"
        })
    } catch (error) {
        throw error;
    }

}


//export
module.exports = checkEmail;