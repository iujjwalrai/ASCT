const User = require("../models/User");


exports.advocatesListCon = async(req, res)=>{
    try{
        const users = await User.find().select("name RegNo COPNo Jila createdAt AdPractice Gender");

        return res.status(200).json({
            success: true,
            message: "Fethched all advocates successfully",
            users
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

