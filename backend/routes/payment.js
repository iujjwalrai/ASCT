const express = require("express");

const router = express.Router();

const {payment_asct} = require("../controllers/payment_asct");
const {createVyawasthaOrder, verifyVyawasthaPayment} = require("../controllers/paymentVyawastha");
const {auth} = require("../middleware/auth");

router.post('/paymentCapture/asct', auth, payment_asct);
router.post('/paymentCapture/createVyawasthaOrder', auth, createVyawasthaOrder);
router.post('/paymentCapture/verifyVyawastha', verifyVyawasthaPayment);
module.exports = router;