// dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const notFoundHandler = require('./middlewares/common/notFoundHandler');
const { errorHandler } = require('./middlewares/common/errorHandler');
const registerRoute = require('./routes/authentication/registerRoute');
const loginRoute = require('./routes/authentication/loginRoute');
const getIndexRoute = require('./routes/home/getIndexRoute');
const cookieParser = require('cookie-parser');
const authAPIsRoute = require('./routes/APIs/authAPIsRoute');
const resetPasswordRoute = require('./routes/authentication/resetPasswordRoute');
const verifyOTPRoute = require('./routes/authentication/verifyOTPRoute');
const createNewPasswordRoute = require('./routes/authentication/createNewPasswordRoute');


// app initialize
const app = express();
dotenv.config()


// app settings
app.set('view engine', 'ejs');


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser(process.env.COOKIE_SECRET))



// initialized Route for API
app.use('/api/auth', authAPIsRoute)


// initialized route MVC
app.use('/register', registerRoute )
app.use('/login', loginRoute );
app.use('/resetPassword', resetPasswordRoute );
app.use('/otpVerification', verifyOTPRoute );
app.use('/createNewPassword', createNewPasswordRoute );
app.use('/confirm', (req,res)=>{
    res.render("pages/auth/confirmation", {title:"confirmation" ,error:{}, username:null, registration:null})
} );
app.use("/", getIndexRoute)



// not found handler
app.use(notFoundHandler)


// error handler
app.use(errorHandler)



// database connection
mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        // listing to port
        app.listen(process.env.PORT || 3000, () => {
            console.log("DB Connected Successfully and Server is running!");
        })

    })
    .catch(console.log)