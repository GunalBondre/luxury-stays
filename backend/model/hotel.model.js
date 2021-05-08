const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema(
	{
		hotelName: { type: String, required: true },

		description: {
			type: String,
			required: true,
			maxlength: 10000,
		},

		price: {
			type: Number,
			required: true,
			trim: true,
		},
		location: {
			type: String,
			required: true,
		},
		to: {
			type: Date,
		},
		from: {
			type: Date,
		},
		image: {
			data: Buffer,
			contentType: String,
		},
		bed: { type: Number },

		postedBy: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
	},
	{ timestamp: true }
);

const HotelModel = mongoose.model("HotelModel", hotelSchema);
module.exports = HotelModel;
