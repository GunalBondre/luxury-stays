const User = require("../model/user.model");

const isAdmin = async (req, res, next) => {
	const user = await User.findOne();
	if (!user.roles === "admin") {
		console.log("error");
	}
	next();
};

module.exports = isAdmin;
