const User = require("../models/User");

exports.updateProfile = async(req, res)=>{
    try{
        const id = req.user.id

        let foundUser = await User.findById(id);

        if(!foundUser){
            return res.status(403).json({
                success: false,
                message: "User not found! Please try again"
            });
        }
        else{
            const updateObject = req.body;
            console.log(foundUser);
            foundUser = foundUser.toObject();
            foundUser.password = undefined;
            console.log(req.body);

            let updatedUser = await User.findByIdAndUpdate(id, updateObject, {new: true})


            updatedUser = updatedUser.toObject();
            updatedUser.password = undefined;

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user: updatedUser
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}