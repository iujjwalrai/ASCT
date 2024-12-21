const mongoose = require("mongoose");

const VyawasthaDonationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vyawastha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SahyogList",
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String
    }
}, {timestamps: true});


module.exports = mongoose.model("VyawasthaDonation", VyawasthaDonationSchema);
