const createProxyMiddleware = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		["/auth/login", "/auth/register", "/hotel/register"],
		createProxyMiddleware({
			target: "http://localhost:4000",
		})
	);

	// app.use(
	// 	[""],
	// 	createProxyMiddleware({
	// 		target: "http://localhost:3000",
	// 	})
	// );
};
