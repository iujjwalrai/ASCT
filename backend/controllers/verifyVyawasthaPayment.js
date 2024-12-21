const crypto = require("crypto");
const User = require("../models/User");
const VyawasthaList = require("../models/VyawasthaList");
const VyawasthaDonation = require("../models/VyawasthaDonation");
require("dotenv").config();

exports.verifyVyawasthaPayment = async(req, res)=>{
    try{
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const { vyawasthaId, userId, amount } = req.body;  // Ensure these values are passed
        const razorpay = require('razorpay');
        const instance = new razorpay({
            key_id: process.env.RAZOR_KEY_ID,
            key_secret: process.env.RAZOR_KEY_SECRET,
        });
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        
        if (expectedSignature!==razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }


        const vyawastha = await VyawasthaList.findById(vyawasthaId);
        if (!vyawastha) {
            return res.status(404).json({ success: false, message: "Vyawastha not found" });
        }

        const newDonation = await VyawasthaDonation.create({
              user: userId,
              vyawastha: vyawasthaId,
              transactionId: razorpay_payment_id,
              amount: amount
        });

        console.log("Donation created: ", newDonation);

        return res.status(200).json({
            success: true,
            message: "Payment verified and donation recorded successfully",
            user,
            transactionId: razorpay_payment_id
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while verifying the payment",
        });
    }
}