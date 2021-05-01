const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: { type: String },
		email: { type: String },
		password: { type: String },
		googleId: { type: String },
		phone: { type: String },
	},
	{ timestamp: true }
);

const User = mongoose.model("User", userSchema);
module.export = User;
