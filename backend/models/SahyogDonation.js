const mongoose = require("mongoose");

const SahyogDonationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sahyog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SahyogList",
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    receiptUrl: {
        type: String,
        required: true
    },
    transactionId: {
        type: String
    }
}, {timestamps: true});


module.exports = mongoose.model("SahyogDonation", SahyogDonationSchema);
