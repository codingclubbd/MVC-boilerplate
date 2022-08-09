//dependencies
const jwt = require("jsonwebtoken");


// check login Middleware
const checkLogin = async (req, res, next)=>{
    const {registration} = req.query;

    try {
        if (req?.signedCookies?.access_token) {
            const token = req.signedCookies.access_token.split(' ')[1];
            const decode = await jwt.verify(token, process.env.JWT_SECRET)

            req.email = decode.email;
            req.username = decode.username;
            if (req.originalUrl === '/login' || req.originalUrl === "/register") {
             return res.redirect('/')
            }
            next()
        } else {
            if (req.originalUrl === '/register') return  res.render('pages/auth/register',  {error:{},user:{}});

            res.render('pages/auth/login',  {error:{}, username:null, registration})
        }

        
    } catch (error) {
        if (error.message === "jwt expired") {
            if (req.originalUrl === '/register')  return  res.render('pages/auth/register',  {error:{}, user:{}});
            res.render('pages/auth/login',  { error: {}, username: null, registration})
        }
        next(error)
    }
}

// exports
module.exports = checkLogin;