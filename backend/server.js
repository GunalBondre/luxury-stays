const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5000;
const indexRoute = require("./routes/index");
const authRouter = require("./routes/authRoute");
require("./model/db");
// middlewares
app.use(cors());
app.use(express.json());
// app.use(morgan("combined"));

// routesj
app.use("/", indexRoute);
app.use("/auth", authRouter);

// port
app.listen(port, () => {
	console.log(`server listening on port ${port}`);
});
