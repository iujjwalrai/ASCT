const VyawasthaList = require("../models/VyawasthaList");

exports.allVyawastha = async(req, res)=>{
    try{
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const vyawasthas = await VyawasthaList.find({createdAt: { $gte: sixMonthsAgo}});

        console.log(vyawasthas);

        vyawasthas.forEach(sahyog => {
            delete sahyog.donatedUsers;
        });
        
        return res.status(200).json({
            success: true,
            message: "Fetched all the vyawasthas succesfully",
            vyawasthas
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}