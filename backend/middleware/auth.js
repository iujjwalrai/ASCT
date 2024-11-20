const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = async(req, res, next)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token missing"
            })
        }


        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET) // jwt.verify token sahi hone pe to decoded payload return karega aur sahi nahi hone pe error throw karega jo kee try-catch block ke dwara pakda jaa sakta hai
            req.user = decode;
            console.log(req.body);
        }
        catch(e){
            return res.status(401).json({
                success: false,
                message: "Token is invaild"
            })
        }
        next();
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token"
        })
    }
}