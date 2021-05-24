const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// check if email exist
		let user = await User.findOne({ email });
		if (!user) return res.status(400).send("email does not exist");

		user.comparePassword(password, (err, match) => {
			if (!match || err) return res.status(400).send("password does not match");
			let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "7d",
			});
			res.status(200).json({
				token,
				name: user.name,
				email: user.email,
				roles: user.roles,
				id: user._id,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		});
	} catch (error) {
		console.log(err);
		return res.status(400).send("login failed");
	}
};

const register = async (req, res) => {
	const { email, password, phone, name } = req.body;

	if (!name) return res.status(400).send("name is required");

	if (!password || password.length < 6)
		return res
			.status(400)
			.send("password is required and should be min of 6 character");

	const userExist = await User.findOne({ email });
	if (userExist) return res.status(400).send("email is taken");

	const user = new User(req.body);
	try {
		await user.save();
		res.status(200).json({ user });
	} catch (error) {
		console.log("err");
		return res.status(400).send("Error, try again");
	}
};

const updateUser = () => {};

const deleteUser = () => {};

module.exports = {
	login,
	register,
	updateUser,
	deleteUser,
};
