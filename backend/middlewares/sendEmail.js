const nodemailer = require("nodemailer");

const sendEmail = async (info, res) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // upgrade later with STARTTLS
		auth: {
			user: "bondre.gunal@gmail.com",
			pass: "izxfinqtrjfvwfpf",
		},
	});

	transporter.verify(function (error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log("Server is ready to take our messages");
		}
	});

	const options = {
		from: info.from,
		to: info.to,
		subject: info.subject,
		text: info.text,
	};

	let result = await transporter.sendMail(options);
	if (result) {
		return result;
	} else {
		console.log("no");
		res.status(400).send("fail to send email");
	}
	// if (!result) {
	// 	console.log("error");
	// } else {
	// 	return res.status(200).json("please check your email");
	// }
};

module.exports = sendEmail;
