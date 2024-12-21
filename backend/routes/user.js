const express = require("express");

const router = express.Router();


const {loginCon} = require("../controllers/loginCon");
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
router.post("/login", loginCon);

router.get("/advocate/my-profile", auth, profileShow);

router.put("/advocate/update-profile", auth, updateProfile);

router.get("/advocate/allSahyog", auth, allSahyog);

router.get("/advocate/allVyawastha", auth, allVyawastha);

router.get("/advocate/checkSahyog", auth, checkSahyogDonation);

router.get("/advocate/checkVyawastha", auth, checkVyawasthaDonation);

router.put("/advocate/updatePass", auth, updatePassword);

router.put("/advocate/selfDeclaration", auth, selfDeclaration);

router.post("/advocate/uploadSahyogPayment", auth, uploadSahyogPayment);
module.exports = router;