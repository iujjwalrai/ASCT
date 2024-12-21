const SahyogDonation = require("../models/SahyogDonation");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const {cloudinaryConnect} = require("../config/cloudinary");
cloudinaryConnect();
async function uploadFileToCloudinary(file, folder){
    const options = {folder}
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.uploadSahyogPayment = async(req, res)=>{
    try{
        if (!req.files || !req.files.file) {
            return res.status(400).json({
              success: false,
              message: "No file uploaded",
            });
        }
        const file = req.files.file;
        console.log("File info ", file);
        const {userId, sahyogId, amount} = req.body;

        const response = await uploadFileToCloudinary(file, "ASCT-receipts");
        console.log(response);

        const newDonation = SahyogDonation.create({user: userId, sahyog: sahyogId, amount: amount, receiptUrl: response.secure_url});

        return res.status(200).json({
            success: true,
            message: `Receipt successfully uploaded`,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Internal Server Error`
        })
    }
}



