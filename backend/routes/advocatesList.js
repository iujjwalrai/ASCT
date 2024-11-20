const express = require("express");

const router = express.Router();

const { advocatesListCon } = require("../controllers/advocatesListCon");


router.get("/getAdvocatesList", advocatesListCon);


module.exports = router;