const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Admin", AdminSchema);