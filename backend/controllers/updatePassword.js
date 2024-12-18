const User = require("../models/User");
const bcrypt = require("bcrypt")

exports.updatePassword = async (req, res)=>{
    try{
        const {userId, oldPass, newPass, newPassAgain} = req.body;
        if(!oldPass || !newPass || !newPassAgain){
            return res.status(401).json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }

        if(newPassAgain !== newPass){
            return res.status(403).json({
                success: false,
                message: "Password and Confirm Password must be same!"
            })
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!!"
            })
        }

        const check = await bcrypt.compare(oldPass, user.password);

        if(!check){
            return res.status(403).json({
                success: false,
                message: "Old password and the password you entered dont match"
            })
        }
        else{
            let hashedPassword;
            try{
                hashedPassword = await bcrypt.hash(newPass, 10);
            }
            catch(e){
                console.error(e);
                return res.status(500).json({
                    success: false,
                    message: "Error in hashing the password"
                })
            }

            const updatedUser = await User.findByIdAndUpdate(userId, {password: hashedPassword}, {new: true});
            if(!updatedUser){
                return res.status(500).json({
                    success: false,
                    messgae: "Error in updating the password"
                })
            }
            else{
                return res.status(200).json({
                    success: true,
                    messgae: "Password updated successfully"
                })
            }
        }

    }
    catch(err){
        console.error(err);
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error while updating the password"
        })
    }
}