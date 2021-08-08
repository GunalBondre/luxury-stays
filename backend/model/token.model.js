const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 3600, // this is the expiry time in seconds
	},
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
