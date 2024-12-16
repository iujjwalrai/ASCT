const express = require("express");

const router = express.Router();

const {sahyogPayment} = require("../controllers/sahyogPayment");
const {verifySahyogPayment} = require("../controllers/verifySahyogPayment")
const {auth} = require("../middleware/auth");

router.post('/paymentCapture/sahyog', auth, sahyogPayment);
router.post('/paymentCapture/verify', verifySahyogPayment)

module.exports = router;