const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");

// controller import
const hotelController = require("../controller/hotelController");

// routes

router.route("/register").post(formidable(), hotelController.registerHotel);

router.route("/").get(hotelController.allHotels);

router
	.route("/:id")
	.get(hotelController.singleHotel)
	.patch(hotelController.updateHotel)
	.delete(hotelController.deleteHotel);

module.exports = router;
