const razor = require("razorpay");
const crypto = require("crypto");
const VyawasthaDonation = require("../models/VyawasthaDonation");

require("dotenv").config();

const razorInstance = new razor({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
});

exports.createVyawasthaOrder = async (req, res) => {
    try {
        const { amount, vyawasthaId, userId } = req.body;

        if (!amount || !vyawasthaId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Amount, vyawasthaId, and userId are required",
            });
        }

        const shortVyawasthaId = String(vyawasthaId).slice(-6);
        const shortUserId = String(userId).slice(-6);
        const timestamp = Math.floor(Date.now() / 1000);
        const receiptId = `vyaw_${shortVyawasthaId}_${shortUserId}_${timestamp}`.slice(0, 40);

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: receiptId,
            notes: {
                vyawasthaId: vyawasthaId,
                userId: userId,
            }
        };

        const order = await razorInstance.orders.create(options);
        
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
            key: process.env.RAZOR_KEY_ID,
        });
    } catch (error) {
        console.error("Error creating Vyawastha order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};

exports.verifyVyawasthaPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, vyawasthaId, userId, amount } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !vyawasthaId || !userId || !amount) {
            return res.status(400).json({
                success: false,
                message: "All payment details are required",
            });
        }

        // Verify the signature
        const text = `${razorpay_order_id}|${razorpay_payment_id}`;
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
            .update(text)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed - Invalid signature",
            });
        }

        // Create donation record
        const newDonation = await VyawasthaDonation.create({
            user: userId,
            vyawastha: vyawasthaId,
            amount: amount,
            transactionId: razorpay_payment_id,
        });

        return res.status(200).json({
            success: true,
            message: "Payment verified and donation recorded successfully",
            transactionId: newDonation._id,
            razorpayPaymentId: razorpay_payment_id,
        });
    } catch (error) {
        console.error("Error verifying Vyawastha payment:", error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: error.message
        });
    }
};

