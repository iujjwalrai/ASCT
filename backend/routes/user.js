const express = require("express");

const router = express.Router();


const {loginCon} = require("../controllers/loginCon");
const {profileShow} = require('../controllers/profileShow');
const {updateProfile} = require("../controllers/updateProfile")
const { auth } = require("../middleware/auth");
const { allSahyog } = require("../controllers/allSahyog")

router.post("/login", loginCon);

router.get("/advocate/my-profile", auth, profileShow);

router.put("/advocate/update-profile", auth, updateProfile);

router.get("/advocate/allSahyog", auth, allSahyog)


module.exports = router;