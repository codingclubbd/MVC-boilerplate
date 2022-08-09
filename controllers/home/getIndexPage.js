// dependencies


// get index page
const getIndexPage = (req, res, next) => {
    const user = {email: req.email, username: req.username}
    try {
        res.render('pages/index', {user})
    } catch (error) {
        next(error)
    }
}


// export
module.exports = getIndexPage;