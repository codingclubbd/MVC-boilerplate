//dependencies


//get register page 
const getRegisterPage = (req, res, next) => {
    try {
        res.render('pages/auth/register', {error:{}, user:{}})
    } catch (error) {
        next(error)
    }
}


//export
module.exports = getRegisterPage;