const VyawasthaDonation = require("../models/VyawasthaDonation");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { cloudinaryConnect } = require("../config/cloudinary");
cloudinaryConnect();

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.uploadVyawasthaPayment = async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const file = req.files.file;
    console.log("File info:", file);

    const { userId, vyawasthaId, amount } = req.body;

    const response = await uploadFileToCloudinary(file, "VyawasthaReceipts");
    console.log("Cloudinary response:", response);

    const newDonation = await VyawasthaDonation.create({
      user: userId,
      vyawastha: vyawasthaId,
      amount: amount,
      receiptUrl: response.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "Receipt successfully uploaded",
      transactionId: newDonation._id, // Optional: return ID for reference
    });
  } catch (error) {
    console.error("Error uploading Vyawastha receipt:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
