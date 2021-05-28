const createProxyMiddleware = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		[
			"/auth/login",
			"/auth/register",
			"/hotel/register",
			"/hotel",
			"/hotel/image/:id",
			"/hotel/:id",
			"/hotel/sellerHotel",
			"/billing/create-payment-intent",
			"/billing/create-checkout-session",
			"/billing/orderSuccess",
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
