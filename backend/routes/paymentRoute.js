const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");
const requireSignin = require("../middlewares/requireSignin");

router
	.route("/create-checkout-session")
	.post(requireSignin, paymentController.stripePay);
router
	.route("/orderSuccess")
	.post(requireSignin, paymentController.orderSuccess);

module.exports = router;
