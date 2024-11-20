const User = require("../models/User");


exports.profileShow = async (req, res)=>{
    try{
        console.log(req.user);
        const id = req.user.id;

        let foundUser = await User.findById(id);

        if(!foundUser){
            return res.status(403).json({
                success: false,
                messgae: "User not found in the database. Kindly re register"
            });
        }
        else{
            console.log(foundUser);
            foundUser = foundUser.toObject();
            foundUser.password = undefined;
            return res.status(200).json({
                success: true,
                messgae: "User found successfully",
                user: foundUser
            })
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            messgae: "Internal Serevr Error"
        })
    }
}

