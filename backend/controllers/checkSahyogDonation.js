const Donation = require("../models/Donation");
exports.checkSahyogDonation = async(req, res)=>{
    try{
        const {userId, sahyogId} = req.query;

        const donation = await Donation.findOne({user: userId, sahyog:sahyogId});

        return res.status(200).json({
            donated: !!donation,
            transactionId: donation?.transactionId || null
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}