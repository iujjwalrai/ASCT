const SahyogList = require("../models/SahyogList");
exports.allSahyog = async (req, res)=>{
    try{
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const sahyogs = await SahyogList.find({createdAt: { $gte: sixMonthsAgo}}).populate('user', 'name RegNo COPNo');

        console.log(sahyogs);

        sahyogs.forEach(sahyog => {
            delete sahyog.donatedUsers;
          });   

        return res.status(200).json({
            success: true,
            message: "Fetched all the sahyogs succesfully",
            sahyogs
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