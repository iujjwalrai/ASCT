const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sahyog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SahyogList",
        default: null
    },
    vyawastha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VyawasthaList"
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String
    }
}, {timestamps: true});


module.exports = mongoose.model("Donation", DonationSchema);
