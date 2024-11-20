const VyawasthaList = require("../models/VyawasthaList");


exports.createVyawastha = async (req, res)=>{
    try{
        const {name, description, endDate, amount} = req.body;

        if(!name || !description || !amount){
            return res.status(401).json({
                success: false,
                message: "All fields are necessary"
            })
        }

        const createdVyawastha = await VyawasthaList.create({name, description, endDate, amount});

        return res.status(200).json({
            success: true,
            message: "Vyawastha created successfully",
            createdVyawastha
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Vyawastha cannot be created! Internl server error!"
        })
    }
}