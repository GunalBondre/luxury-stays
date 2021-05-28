const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 4000;
const indexRoute = require("./routes/index");
const authRouter = require("./routes/authRoute");
const hotelRouter = require("./routes/hotelRoute");
const paymentRouter = require("./routes/paymentRoute");

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

// port
app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
