const bcrypt = require("bcrypt");
const User = require("../models/User");
exports.registerCon = async (req,res)=>{
    const {name, mobile, RegNo, RegNoYear, COPNo, COPNoYear, email, password, DOB, Gender, BloodGroup, AdPractice, Jila, Tehsil, HomeAddress, HomeDistrict} = req.body;

    const fetchedUser = await User.findOne({mobile});

    if(fetchedUser){
        return res.status(403).json({
            success: false,
            message: "User already registered with this Mobile number"
        })
    }
    try{
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error in hashing the password"
            })
        }
        const createdUser = await User.create({name, mobile, RegNo, RegNoYear, COPNo, COPNoYear, email, password: hashedPassword, DOB, Gender, BloodGroup, AdPractice, Jila, Tehsil, HomeAddress, HomeDistrict});

        return res.status(200).json({
            success: true,
            createdUser,
            message: "User created successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            messgae: "User cannot be registered. Internal server error"
        })
    }
}