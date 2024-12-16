const express = require("express");

const router = express.Router();

const {createSahyog} = require("../controllers/createSahyog");
const {adminLogin} = require("../controllers/adminLogin");
const {adminAuth} = require("../middleware/adminAuth");
const {createVyawastha} = require("../controllers/createVyawastha")

router.post("/admin/login", adminLogin);
router.post("/admin/createSahyog", adminAuth, createSahyog);
router.post("/admin/createVyawastha", adminAuth, createVyawastha);

module.exports = router;

