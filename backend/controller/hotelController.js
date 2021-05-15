const HotelModel = require("../model/hotel.model");
require("dotenv").config();
const fs = require("fs");
const registerHotel = async (req, res) => {
	try {
		let fields = req.fields;
		let files = req.files;

		let hotel = new HotelModel(fields);

		if (files.image) {
			hotel.image.data = fs.readFileSync(files.image.path);
			hotel.image.contentType = files.image.type;
		}

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
	let hotels = await HotelModel.find({})
		.limit(24)
		.select("-image.data")
		.populate("postedBy", "_id name");
	res.json(hotels);
};
const image = async (req, res) => {
	let hotel = await HotelModel.findById(req.params.id);

	if (hotel && hotel.image && hotel.image.data !== null) {
		res.set("content-Type", hotel.image.contentType);

		return res.send(hotel.image.data);
	}
};
const updateHotel = () => {};
const deleteHotel = () => {};
const singleHotel = () => {};

module.exports = {
	image,
	singleHotel,
	allHotels,
	registerHotel,
	updateHotel,
	deleteHotel,
};
