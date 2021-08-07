const HotelModel = require("../model/hotel.model");
const User = require("../model/user.model");
const Order = require("../model/order.model");
const dayjs = require("dayjs");

require("dotenv").config();
const fs = require("fs");
const registerHotel = async (req, res) => {
	try {
		let fields = req.fields;
		let files = req.files;
		let user = await User.findById(req.user._id);
		let hotel = new HotelModel(fields);

		if (files.image) {
			hotel.image.data = fs.readFileSync(files.image.path);
			hotel.image.contentType = files.image.type;
		}
		hotel.postedBy = req.user._id;
		user.roles = "seller";
		user.save();
		hotel.save((err, result) => {
			if (err) {
				res.status(400).send("error saving hotel");
			}
			res.json(result);
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const allHotels = async (req, res) => {
	try {
		let hotels = await HotelModel.find({ verifiedStatus: "verified" })
			.limit(24)
			.select("-image.data")
			.populate("postedBy", "_id name");
		res.json(hotels);
	} catch (error) {
		console.log("error");
	}
};

const allHotelsAdmin = async (req, res) => {
	try {
		let hotels = await HotelModel.find()
			.limit(24)
			.select("-image.data")
			.populate("postedBy", "_id name");
		res.json(hotels);
	} catch (error) {
		console.log("error");
	}
};
const image = async (req, res) => {
	let hotel = await HotelModel.findById(req.params.id);

	if (hotel && hotel.image && hotel.image.data !== null) {
		res.set("content-Type", hotel.image.contentType);

		return res.send(hotel.image.data);
	}
};
const updateHotel = async (req, res) => {
	try {
		let fields = req.fields;
		let files = req.files;
		let data = { ...fields };
		if (files.image) {
			let image = {};
			image.data = fs.readFileSync(files.image.path);
			image.contentType = files.image.type;

			data.image = image;
		}
		let updated = await HotelModel.findByIdAndUpdate(req.params.id, data, {
			new: true,
		}).select("-image.data");
		res.json(updated);
	} catch (error) {}
};
const deleteHotel = async (req, res) => {
	try {
		await HotelModel.findByIdAndDelete(req.params.id);
	} catch (error) {
		console.log("error");
	}
};

const singleHotel = async (req, res) => {
	try {
		let hotel = await HotelModel.findById(req.params.id).select("-image.data");
		res.json(hotel);
	} catch (error) {
		console.log("single hotel error");
	}
};

const allHotelOfSingleSeller = async (req, res) => {
	try {
		let hotel = await HotelModel.find({ postedBy: req.user._id });
		res.json(hotel);
	} catch (error) {
		console.log("all hotel by single seller error");
	}
};

// admin routes
const adminOperations = async (req, res) => {
	try {
		let hotel = await HotelModel.findOne({ _id: req.params.id });
		const { operation } = req.body;
		if (operation === "approve") {
			hotel.verifiedStatus = "verified";
			hotel.save();
			res.json(hotel);
		} else {
			hotel.verifiedStatus = "rejected";
			hotel.save();
			res.json(hotel);
		}
	} catch (error) {
		console.log(error);
	}
};

const userBookings = async (req, res) => {
	let allBooking = await Order.find({ orderedBy: req.user._id })
		.select("stripe_session")
		.select("to")
		.select("from")
		.populate("id", "-image.data")
		.populate("orderedBy", "_id name")
		.exec();
	res.json(allBooking);
};

const isBooked = async (req, res) => {
	let now = dayjs(new Date()).format("DD-MM-YY");
	const { id } = req.params;
	let allOrders = await Order.find({ orderedBy: req.user._id });

	let orderArr = [];
	let expOrder = [];

	for (let i = 0; i < allOrders.length; i++) {
		if (allOrders[i].to > now) {
			orderArr.push(allOrders[i].id.toString());
		} else {
			expOrder.push(allOrders[i].id.toString());
		}
	}
	return res.json({
		ok: orderArr.includes(id),
	});
};

const cancelBooking = async (req, res) => {
	let order = await Order.findOneAndDelete({ _id: req.params.id });
};

const roomAvailable = async (req, res) => {
	let allOrders = await Order.find();
	const hotel = await HotelModel.find();
};

const booking_update_to_seller = async (req, res) => {
	try {
		let hotel = await HotelModel.find({ postedBy: req.user._id });
		let userOrders;
		let userOrderData = [];

		if (hotel.length === 1) {
			userOrders = await Order.find({ id: hotel._id });
			return res.json(userOrders);
		} else {
			for (let i = 0; i < hotel.length; i++) {
				userOrders = await Order.find({ id: hotel[i]._id }).exec();
				userOrderData.push(...userOrders);
			}
			res.json(userOrderData);
		}
	} catch (error) {
		console.log("error");
	}
};
const searchListing = async (req, res) => {
	const { searchlocation, date, bed } = req.body;
	console.log(`${searchlocation}`);
	let result = await HotelModel.find({
		location: searchlocation.trim(),
	}).select("-image.data");

	console.log(result);
	res.json(result);
};

module.exports = {
	searchListing,
	booking_update_to_seller,
	roomAvailable,
	cancelBooking,
	isBooked,
	userBookings,
	image,
	singleHotel,
	allHotels,
	registerHotel,
	updateHotel,
	deleteHotel,
	allHotelOfSingleSeller,
	adminOperations,
	allHotelsAdmin,
};
