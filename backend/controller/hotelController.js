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
const updateHotel = () => {};
const deleteHotel = () => {};
const allHotels = () => {};
const singleHotel = () => {};

module.exports = {
	singleHotel,
	allHotels,
	registerHotel,
	updateHotel,
	deleteHotel,
};
