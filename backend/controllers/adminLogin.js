const Admin = require("../models/Admin");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

require("dotenv").config();

exports.adminLogin = async (req, res)=>{
    const {mobile, password} = req.body;
    if(!mobile || !password){
        return res.status(403).json({
            success: false,
            messgae: "All fields are required"
        });
    }
    try{
        let admin = await Admin.findOne({mobile});
        if(!admin){
            return res.status(404).json({
                success: false,
                messgae: "Admin is not found"
            })
        }
        const payload = {
            mobile: admin.mobile,
            id: admin._id
        }

        try{
            const check = bcrypt.compare(password, admin.password);
            if(!check){
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! Password incorrect"
                })
            }
            else{
                let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h", issuer: "ASCT - UP"});

                admin = admin.toObject();
                admin.password = undefined;

                const options = {
                    expires : new Date(Date.now() + 2 * 60 * 60 * 1000),
                    httpOnly: false,
                }

                res.cookie("adminToken", token, options).status(200).json({
                    success: true,
                    admin,
                    message: "Admin logged in successfully"
                });
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