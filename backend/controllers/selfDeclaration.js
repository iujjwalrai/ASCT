const User = require("../models/User");

exports.selfDeclaration = async (req, res)=>{
    try{
        const {agree, userId} = req.body;

        const foundUser = await User.findById(userId);

        if(!foundUser){
            return res.status(401).json({
                success: false,
                message: "User not found! Please try again"
            })
        }

        const newUser = await User.findByIdAndUpdate(userId, {selfDeclaration: agree}, {new: true});

        if(!newUser){
            return res.status(401).json({
                success: false,
                message: "Error in declaring self declaration"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Updated the Self Declaration"
        })
    }
    catch(error){
        console.error(error);
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

