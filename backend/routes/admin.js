const express = require("express");

const router = express.Router();

const {createSahyog} = require("../controllers/createSahyog");
const {adminLogin} = require("../controllers/adminLogin");
const {adminAuth} = require("../middleware/adminAuth");
const {createVyawastha} = require("../controllers/createVyawastha")
const {adminProfileShow} = require("../controllers/adminProfileShow")
const {sahyogCompleted} = require("../controllers/CompletionCont");
const {vyawasthaCompleted} = require("../controllers/CompletionCont");
router.post("/admin/login", adminLogin);
router.get("/admin/profile", adminAuth, adminProfileShow)
router.post("/admin/createSahyog", adminAuth, createSahyog);
router.post("/admin/createVyawastha", adminAuth, createVyawastha);
router.post("/admin/sahyogComp", adminAuth, sahyogCompleted);
router.post("/admin/vyawasthaComp", adminAuth, vyawasthaCompleted);
module.exports = router;

