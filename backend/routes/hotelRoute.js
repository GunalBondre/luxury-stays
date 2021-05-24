const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");

// controller import
const hotelController = require("../controller/hotelController");
const requireSignin = require("../middlewares/requireSignin");
const isAdmin = require("../middlewares/isAdmin");

// routes

router
	.route("/register")
	.post(formidable(), requireSignin, hotelController.registerHotel);

router.route("/").get(requireSignin, hotelController.allHotels);
router.route("/image/:id").get(hotelController.image);

router
	.route("/sellerHotel")
	.get(requireSignin, hotelController.allHotelOfSingleSeller);

router
	.route("/:id")
	.get(hotelController.singleHotel)
	.put(formidable(), hotelController.updateHotel)
	.delete(hotelController.deleteHotel)
	.patch(hotelController.adminOperations);

module.exports = router;
