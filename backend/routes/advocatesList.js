const express = require("express");

const router = express.Router();

const { advocatesListCon } = require("../controllers/advocatesListCon");
const {allSahyog} = require("../controllers/allSahyog");
const {allVyawastha} = require("../controllers/allVyawastha");
router.get("/getAdvocatesList", advocatesListCon);
router.get("/getSahyogList", allSahyog);
router.get("/getVyawasthaList", allVyawastha);

module.exports = router;