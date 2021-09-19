const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 4000;
const indexRoute = require("./routes/index");
const authRouter = require("./routes/authRoute");
const hotelRouter = require("./routes/hotelRoute");
const paymentRouter = require("./routes/paymentRoute");
const path = require("path");
require("./model/db");
// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/", indexRoute);
app.use("/auth", authRouter);
app.use("/hotel", hotelRouter);
app.use("/billing", paymentRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
// port
app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
