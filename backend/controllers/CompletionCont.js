const SahyogList = require("../models/SahyogList");
const VyawasthaList = require("../models/VyawasthaList");


exports.sahyogCompleted = async(req, res)=>{
    try{
        const {id} = req.body;
        if(!id){
            return res.status(401).json({
                success: false,
                message: "No Object Id found"
            })
        }
        let foundSahyog = await SahyogList.findById(id);
        if(!foundSahyog){
            return res.status(404).json({
                success: false,
                message: "No Sahyog found with this id"
            })
        }
        foundSahyog.isCompleted = true;
        foundSahyog.save();
        return res.status(200).json({
            success: true,
            message: "Sahyog marked as completed"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: true,
            message: "Internal server error"
        })
    }
}

exports.vyawasthaCompleted = async(req, res)=>{
    try{
        const {id} = req.body;
        if(!id){
            return res.status(401).json({
                success: false,
                message: "No Object Id found"
            })
        }
        let foundVyawastha = await VyawasthaList.findById(id);
        if(!foundVyawastha){
            return res.status(404).json({
                success: false,
                message: "No Vyawastha found with this id"
            })
        }
        foundVyawastha.isCompleted = true;
        foundVyawastha.save();

        return res.status(200).json({
            success: true,
            message: "Vyawastha marked as completed"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: true,
            message: "Internal server error"
        })
    }
}