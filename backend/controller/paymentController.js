require("dotenv").config();
const HotelModel = require("../model/hotel.model");
const paymentModel = require("../model/order.model");
const User = require("../model/user.model");
const stripe = require("stripe")(process.env.REACT_APP_PRIVATE_KEY);

const stripePay = async (req, res) => {
	const { id, price, name, to, from } = req.body;
	const user = await User.findById(req.user._id);
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "INR",
					product_data: {
						name: name,
					},
					unit_amount: price * 100,
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.REACT_APP_STRIPE_SUCCESS_URL}/${id}`,
		cancel_url: `${process.env.REACT_APP_STRIPE_CANCEL_URL}`,
	});
	user.stripe_session = session;
	user.save();
	res.json({ id: session.id, to, from });
};

const orderSuccess = async (req, res) => {
	try {
		const { id, to, from, token } = req.body;
		let hotel = await HotelModel.findById(id);
		const user = await User.findById(req.user._id);

		user.stripe_session.payment_status = "paid";
		user.save();
		let order = new paymentModel(req.body).populate("id", "orderedBy");

		const session = await stripe.checkout.sessions.retrieve(
			user.stripe_session.id
		);

		if (session.payment_status == "paid") {
			const orderExist = await paymentModel.findOne({ session: session.id });
			if (orderExist) {
				res.json({ success: true });
			} else {
				let newOrder = new paymentModel({
					id,
					session,
					to,
					from,
					orderedBy: user._id,
				}).save();
				console.log(newOrder);
				await User.findByIdAndUpdate(user._id, {
					$set: { stripe_session: {} },
				});

				res.json({ success: true });
			}
		}
	} catch (error) {
		console.log("order success error");
	}
};
module.exports = {
	stripePay,
	orderSuccess,
};
