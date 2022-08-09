//dependencies

const User = require("../../models/User");



//check user name
const checkUsername = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username
        }, {
            _id: true
        })
        if (user) return res.json({
            msg: "Username is not available!",
            status: false
        });
        return res.json({
            msg: "Username is available",
            status: true
        })
    } catch (error) {
        throw error;
    }
}


//export
module.exports = checkUsername;