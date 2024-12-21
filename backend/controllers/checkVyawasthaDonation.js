const VyawasthaDonation = require("../models/VyawasthaDonation");

exports.checkVyawasthaDonation = async(req, res)=>{
    try{
        const {userId, vyawasthaId} = req.query

        const donation = await VyawasthaDonation.findOne({user: userId, vyawastha: vyawasthaId});

        return res.status(200).json({
            donated: !!donation,
            transactionId: donation?.transactionId || null
        });
    }
    catch(er){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}