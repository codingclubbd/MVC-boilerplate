// dependencies
const nodeMailer = require("nodemailer");
require('dotenv').config();


const sendEmailToUser = async (receivers,data, cb) => {
    try {


        //sending email
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PWD
            },
        });

        const options = {
            form: process.env.EMAIL,
            to: receivers.join(','),
            subject: data.subject,
            html: data.template,
            attachments: data.attachments
        };


        transporter.sendMail(options, cb);


    } catch (error) {
        console.log(error);
        throw error
    }


}
// export
module.exports = sendEmailToUser;