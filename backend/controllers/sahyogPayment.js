const razor = require("razorpay");

require("dotenv").config()

const razorInstance = new razor({
    key_id: process.env.RAZOR_KEY_ID,
    key_secret: process.env.RAZOR_KEY_SECRET
});

exports.sahyogPayment = async (req, res)=>{
    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    try{
        const order = await razorInstance.orders.create(options);
        
        return res.status(200).json({
            sucess: true,
            message: "Payment captured",
            order
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Payment not captured",
            error
        })
    }
}