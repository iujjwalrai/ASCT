const express = require("express");

const router = express.Router();

const {payment_asct} = require("../controllers/payment_asct");
const {verifySahyogPayment} = require("../controllers/verifySahyogPayment")
const {verifyVyawasthaPayment} = require("../controllers/verifyVyawasthaPayment")
const {auth} = require("../middleware/auth");

router.post('/paymentCapture/asct', auth, payment_asct);
router.post('/paymentCapture/verify', verifySahyogPayment)
router.post('/paymentCapture/verifyVyawastha', verifyVyawasthaPayment);
module.exports = router;