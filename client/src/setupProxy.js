const createProxyMiddleware = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		[
			"/auth/login",
			"/auth/register",
			"/auth/resetPass",
			"/auth/requestResetPass",
			"/auth/emailVerification",
			"/hotel/register",
			"/hotel",
			"/hotel/image/:id",
			"/hotel/:id",
			"/hotel/sellerHotel",
			"/billing/create-payment-intent",
			"/billing/create-checkout-session",
			"/billing/orderSuccess",
			"/hotel/user-bookings",
			"/hotel/isBooked/:id",
			"/hotel/cancelBooking/:id",
			"/hotel/roomAvailable",
			"/hotel/booking_update_to_seller",
			"/hotel/search-listing",
			"hotel/allHotelsAdmin",
		],
		createProxyMiddleware({
			target: "http://localhost:4000",
		})
	);

	// app.use(
	// 	["/payment/success", "/payment/failure"],
	// 	createProxyMiddleware({
	// 		target: "http://localhost:3000",
	// 	})
	// );
};
