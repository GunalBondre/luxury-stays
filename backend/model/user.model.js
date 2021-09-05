const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
mongoose.set("debug", true);

const userSchema = mongoose.Schema(
	{
		name: { type: String },

		password: { type: String },
		googleId: { type: String },
		phone: { type: String },
		roles: {
			type: String,
			enum: ["user", "admin", "seller"],
			default: "user",
		},
		email: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		stripe_session: {},
	},
	{ timestamp: true }
);

userSchema.pre("save", function (next) {
	let user = this;
	if (user.isModified("password")) {
		return bcrypt.hash(user.password, 12, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			return next();
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (password, next) {
	bcrypt.compare(password, this.password, function (err, match) {
		if (err) {
			return next(err, false);
		}

		return next(null, match);
	});
};

const User = mongoose.model("User", userSchema);
module.exports = User;
