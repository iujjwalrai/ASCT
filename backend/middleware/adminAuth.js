const jwt = require("jsonwebtoken");

exports.adminAuth = async(req, res, next)=>{
    try{
        const adminToken = req.cookies.adminToken;

        if(!adminToken){
            return res.status(401).json({
                suceess: false,
                messgae: "Token is missing"
            })
        }
        try{
            const decode = jwt.verify(adminToken, process.env.JWT_SECRET);
            req.admin = decode;
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