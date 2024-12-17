const crypto = require("crypto")
const User = require('../models/User');
const SahyogList = require('../models/SahyogList');
const Donation = require("../models/Donation");
require("dotenv").config();
exports.verifySahyogPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const { sahyogId, userId, amount } = req.body;  // Ensure these values are passed

  try {
    // 1. Verify the payment signature using Razorpay's API
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

    // 2. Find the user who made the donation
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 3. Find the SahyogList to update
    const sahyog = await SahyogList.findById(sahyogId);
    if (!sahyog) {
      return res.status(404).json({ success: false, message: "Sahyog not found" });
    }

    const newDonation = await Donation.create({
      user: userId,
      sahyog: sahyogId,
      transactionId: razorpay_payment_id,
      amount: amount
    });

    console.log("Donation created: ", newDonation);

    // 5. Return success response
    return res.status(200).json({
      success: true,
      message: "Payment verified and donation recorded successfully",
      user,
      transactionId: razorpay_payment_id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while verifying the payment",
    });
  }
};
