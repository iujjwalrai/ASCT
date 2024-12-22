const express = require("express");

const router = express.Router();


const {loginCon} = require("../controllers/loginCon");
const {logoutCon} = require("../controllers/logoutCon");
const {profileShow} = require('../controllers/profileShow');
const {updateProfile} = require("../controllers/updateProfile")
const { auth } = require("../middleware/auth");
const { allSahyog } = require("../controllers/allSahyog")
const {checkSahyogDonation} = require("../controllers/checkSahyogDonation");
const {checkVyawasthaDonation} = require("../controllers/checkVyawasthaDonation");
const {allVyawastha} = require("../controllers/allVyawastha");
const {updatePassword} = require("../controllers/updatePassword");
const {selfDeclaration} = require("../controllers/selfDeclaration");
const {uploadSahyogPayment} = require("../controllers/uploadSahyogPayment");
const {sendotp} = require("../controllers/forgetPassCon");
const {verifyOTP} = require("../controllers/forgetPassCon");
const {resetPassword} = require("../controllers/forgetPassCon");
router.post("/login", loginCon);

router.get("/advocate/my-profile", auth, profileShow);

router.put("/advocate/update-profile", auth, updateProfile);

router.get("/advocate/allSahyog", auth, allSahyog);

router.get("/advocate/allVyawastha", auth, allVyawastha);

router.get("/advocate/checkSahyog", auth, checkSahyogDonation);

router.get("/advocate/checkVyawastha", auth, checkVyawasthaDonation);

router.put("/advocate/updatePass", auth, updatePassword);

router.put("/advocate/selfDeclaration", auth, selfDeclaration);

router.post("/advocate/logout", logoutCon);


router.get("/advocate/verifyCookie", auth, (req, res)=>{
    res.status(200).json({
        success: true,
        message: 'User is authenticated',
    });
})

router.post("/advocate/sendotp", sendotp);

router.post("/advocate/verifyOTP", verifyOTP);

router.post("/advocate/resetPassword", resetPassword)

router.post("/advocate/uploadSahyogPayment", auth, uploadSahyogPayment);
module.exports = router;