const User = require("../model/user.model");

const isAdmin = async (req, res, next) => {
	const user = await User.find();
	if (user.roles === "seller") {
		next();
	}
};

module.exports = isAdmin;
