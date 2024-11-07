const nodemailer = require("nodemailer");

require("dotenv").config()


exports.mailSender = async (email, title, body) => {
    try{
        let transporter = await nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: `Advocates Self Care Team - Uttar Pradesh <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `<h1> Greetings from Advocates Self Care Team - Uttar Pradesh</h1> <br> <p>We have received your information. Thanks for Contacting Us. We will get in touch with you soon</p><br><h3>Your enquiry is as follows</h3><br>${body}`
        })
        console.log(info);
        return info;
    }
    catch(error){
        console.log("Some error occured while sending the mail");
        console.error(error);
        return error;
    }
}
