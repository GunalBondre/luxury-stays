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

router.route("/").get(hotelController.allHotels);
router.route("/image/:id").get(hotelController.image);
router.get("/user-bookings", requireSignin, hotelController.userBookings);
router.route("/isBooked/:id").get(requireSignin, hotelController.isBooked);
router.get(
	"/booking_update_to_seller",
	requireSignin,
	hotelController.booking_update_to_seller
);
router
	.route("/search-listing")
	.post(requireSignin, hotelController.searchListing);

router
	.route("/roomAvailable")
	.get(requireSignin, hotelController.roomAvailable);

router.route("/cancelBooking/:id").post(hotelController.cancelBooking);

router
	.route("/sellerHotel")
	.get(requireSignin, hotelController.allHotelOfSingleSeller);

router
	.route("/:id")
	.get(hotelController.singleHotel)
	.put(formidable(), hotelController.updateHotel)
	.delete(hotelController.deleteHotel)
	.patch(hotelController.adminOperations);

// get already booked hotel list

module.exports = router;
