const express = require("express");

const router = express.Router();

const {createSahyog} = require("../controllers/createSahyog");
const {adminLogin} = require("../controllers/adminLogin");
const {adminAuth} = require("../middleware/adminAuth");


router.post("/admin/login", adminLogin);
router.post("/admin/createSahyog", adminAuth, createSahyog);


module.exports = router;

