const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
exports.loginCon = async (req, res)=>{
    const {mobile, password} = req.body;
    if(!mobile || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    try{
        let user = await User.findOne({mobile});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User don't exist. Please Register first"
            })
        }

        const payload = {
            mobile: user.mobile,
            id: user._id,
        }

        try{
            const check = await bcrypt.compare(password, user.password);
            if(!check){
                return res.status(403).json({
                    success: false,
                    message: "Passwords dont match"
                })
            }
            else{
                let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h", issuer: "ASCT - UP"});

                user = user.toObject();
                user.token = token;
                user.password = undefined;

                const options = {
                    expires : new Date(Date.now() + 2 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }
                res.cookie("token", token, options).status(200).json({
                    success: true,
                    token,
                    user,
                    message: "User logged in successfully"
                })
            }
        }
        catch(e){
            console.error(e);
            return res.status(403).json({
                success: false,
                message: "Error authenticating the user"
            })
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login false"
        })
    }
}