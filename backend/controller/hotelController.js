const HotelModel = require("../model/hotel.model");
const User = require("../model/user.model");

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
	let user = await User.findById(req.user._id);
	if (user.roles === "user") {
		let hotels = await HotelModel.find({ verifiedStatus: "verified" })
			.limit(24)
			.select("-image.data")
			.populate("postedBy", "_id name");
		res.json(hotels);
	} else {
		let hotels = await HotelModel.find({});
		res.json(hotels);
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

module.exports = {
	image,
	singleHotel,
	allHotels,
	registerHotel,
	updateHotel,
	deleteHotel,
	allHotelOfSingleSeller,
	adminOperations,
};
