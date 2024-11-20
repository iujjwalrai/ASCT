const mongoose = require("mongoose")
const VyawasthaListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date
    },
    amount: {
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
    },
    donatedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},{timestamps: true})



module.exports = mongoose.model("VyawasthaList", VyawasthaListSchema)

