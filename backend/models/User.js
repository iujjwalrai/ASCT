const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxLength: 10
    },
    RegNo: {
        type: String,
        required: true,
    },
    RegNoYear: {
        type: String,
        required: true
    },
    COPNo: {
        type: String,
        required: true
    },
    COPNoYear: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    BloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-']
    },
    AdPractice: {
        type: String,
        enum: ['Uchh Nyayalay', 'Jila Nyayalay', 'Tehsil Nyayalay'],
        required: true
    },
    Jila: {
        type: String,
        required: true
    },
    Tehsil: {
        type: String,
        required: true
    },
    HomeAddress: {
        type: String,
        required: true
    },
    HomeDistrict: {
        type: String,
        required: true
    },
    firstNomineeName: {
        type: String,
        default: null
    },
    firstNomineeRelation: {
        type: String,
        default: null
    },
    firstNomineeMobile: {
        type: String,
        default: null
    },
    secondNomineeName: {
        type: String,
        default: null
    },
    secondNomineeRelation:{
        type: String,
        default: null
    },
    secondNomineeMobile: {
        type: String,
        default: null
    },
    disease: {
        type: String,
        default: null
    },
    selfDeclaration: {
        type: Boolean,
        default: false
    },
    OTP: {
        type: String,
        default: null
    },
    OTPExpiresAt: {
        type: Date,
        default: null
    }
}, {timestamps: true})


module.exports = mongoose.model("User", UserSchema)