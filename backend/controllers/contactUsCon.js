const { mailSender} = require("../utils/mailSender");

exports.contactUsCon = async (req, res) => {
    const {name, subject, mobile, email, message} = req.body;
    if(!name || !subject || !mobile ||!email ||!message){
        return res.status(403).json({
            success: false,
            message: "All fields are required compulsarily"
        });
    }
    try{
        const data = {
            name,
            subject,
            mobile,
            email,
            message
        }
        const info = await mailSender(email, subject, `<div>${Object.keys(data).map((key)=>{
            return (`<p>${key}: ${data[key]}</p>`);
        })}</div>`);

        if(info) {
            return res.status(200).json({
                success: true,
                message: "Your message has been successfully sent to us",
            })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "Something unexpected occured"
            });
        }
    }
    catch(error){
        return res.status(403).json({
            success: false,
            message: "Internal server error",
        });
    }
}