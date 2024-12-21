const mongoose = require("mongoose")
const SahyogListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: String,
        required: true
    },
    nomineeName: {
        type: String,
        required: true
    },
    nomineeAccount1No: {
        type: String,
        required: true
    },
    nomineeAccount1ifsc: {
        type: String,
        required: true
    },
    nomineeAccount2No: {
        type: String,
        required: true
    },
    nomineeAccount2ifsc: {
        type: String,
        required: true
    },
    amountCollected: {
        type: Number,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})



module.exports = mongoose.model("SahyogList", SahyogListSchema)

