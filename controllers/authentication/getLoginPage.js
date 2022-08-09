//dependencies

//get login page
const getLoginPage = (req, res, next) => {

    try {
        const {registration} = req.query;

        res.render('pages/auth/login', {error:{}, username:null,registration})
    } catch (error) {
        next(error)
    }
}


//export
module.exports = getLoginPage;