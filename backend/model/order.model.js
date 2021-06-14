const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
	{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "HotelModel",
		},

		session: {},
		orderedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		to: {
			type: String,
		},
		from: {
			type: String,
		},
		name: {
			type: String,
		},
		hotelName: {
			type: String,
		},
	},
	{ timestamp: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
