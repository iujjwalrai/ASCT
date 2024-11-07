const express = require("express");

const router = express.Router()

const { contactUsCon } = require("../controllers/contactUsCon");

router.post("/contactUs", contactUsCon);

module.exports = router;