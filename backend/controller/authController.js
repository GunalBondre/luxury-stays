const User = require("../model/user.model");
const Token = require("../model/token.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const queryString = require("query-string");
const sendEmail = require("../middlewares/sendEmail");
require("dotenv").config();

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// check if email exist
		let user = await User.findOne({ email });
		if (!user) return res.status(400).send("email does not exist");
		if (user.isVerified !== true)
			return res.status(400).send("email is not verified");
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
	try {
		if (!name) return res.status(400).send("name is required");

		if (!password || password.length <= 6)
			return res
				.status(400)
				.send("password is required and should be min of 6 character");

		const userExist = await User.findOne({ email });
		if (userExist) return res.status(400).send("email is taken");

		const user = await new User(req.body);
		await user.save();
		let token = await Token.findOne({ userId: user._id });
		if (token) {
			await token.deleteOne();
		}
		let verificationToken = crypto.randomBytes(32).toString("hex");
		let hash = await bcrypt.hash(verificationToken, 10);

		await new Token({
			userId: user._id,
			token: hash,
			createdAt: Date.now(),
		}).save();
		const info = {
			from: "bondre.gunal@gmail.com",
			to: user.email,
			subject: "Email Verification Link",
			text: `link to email verification http://localhost:3000/emailVerification?token=${verificationToken}&id=${user._id}`,
		};
		let result = await sendEmail(info);
		if (!result) {
			toast.error("registration failed");
		} else {
			res.status(200).json({ user: user, message: "please check your email" });
		}
	} catch (error) {
		console.log("err");
		return res.status(400).send("Error, try again");
	}
};

const updateUser = () => {};

const deleteUser = () => {};
const requestResetPass = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(400).send("user does not exist");
		}
		let token = await Token.findOne({ userId: user._id });
		if (token) await token.deleteOne();
		let resetToken = crypto.randomBytes(32).toString("hex");
		const hash = await bcrypt.hash(resetToken, 10);

		await new Token({
			userId: user._id,
			token: hash,
			createdAt: Date.now(),
		}).save();

		const info = {
			from: "bondre.gunal@gmail.com",
			to: user.email,
			subject: "link to reset password",
			text: `You are receiving this text because you or someone else requested password reset click on following link to reset password http://localhost:3000/resetPassword?token=${resetToken}&id=${user._id}`,
		};
		let result = await sendEmail(info);
		if (!result) {
			toast.error("fail to send password reset link");
		} else {
			res.status(200).json({ message: "please check your email" });
		}

		// const transporter = nodemailer.createTransport({
		// 	host: "smtp.gmail.com",
		// 	port: 587,
		// 	secure: false, // upgrade later with STARTTLS
		// 	auth: {
		// 		user: "bondre.gunal@gmail.com",
		// 		pass: "izxfinqtrjfvwfpf",
		// 	},
		// });

		// transporter.verify(function (error, success) {
		// 	if (error) {
		// 		console.log(error);
		// 	} else {
		// 		console.log("Server is ready to take our messages");
		// 	}
		// });

		// const options = {
		// 	from: "bondre.gunal@gmail.com",
		// 	to: user.email,
		// 	subject: "link to reset password",
		// 	text: `You are receiving this text because you or someone else requested password reset click on following link to reset password http://localhost:3000/resetPassword?token=${resetToken}&id=${user._id}`,
		// };

		// let result = await transporter.sendMail(options);
		// if (!result) {
		// 	console.log("error");
		// } else {
		// 	res.status(200).json("recovery email sent");
		// }
	} catch (error) {
		res.status(400).json("something went wrong");
	}
};

const resetPass = async (req, res) => {
	const { token, id, password, confirmPassword } = req.body;
	try {
		let passwordResetToken = await Token.findOne({ userId: id });
		if (!passwordResetToken) {
			res.status(400).json("invalid or expired token");
		}

		const isValid = await bcrypt.compare(token, passwordResetToken.token);
		if (!isValid) {
			res.status(400).json("password reset validity expired please try again");
		}
		if (password === confirmPassword && password.length >= 6) {
			const hashed = await bcrypt.hash(password, 10);
			let user = await User.updateOne(
				{ _id: id },
				{ $set: { password: hashed } },
				{ new: true }
			);

			if (user) {
				console.log(user);
				res.status(200).json(user);
			} else {
				res.status(400).json("password reset failed");
			}
		} else {
			res
				.status(400)
				.json("password does not match or length must be smaller than 6 char");
		}
	} catch (error) {
		res.status(400).json(error);
	}
};

const emailVerification = async (req, res) => {
	const { token, id } = req.body;
	try {
		const user = await User.findOne({ _id: id });
		const verificationToken = await Token.findOne({ userId: id });
		const isValid = await bcrypt.compare(token, verificationToken.token);
		if (!isValid) {
			res.status(400).json("invalid or expired link");
		}
		user.isVerified = true;
		user.save();
		res.status(200).json(user);
	} catch (error) {
		toast.error("verification failed");
	}
};

module.exports = {
	login,
	register,
	updateUser,
	deleteUser,
	resetPass,
	requestResetPass,
	emailVerification,
};
