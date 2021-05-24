require("dotenv").config();
const expressJWT = require("express-jwt");

const requireSignin = expressJWT({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
});

module.exports = requireSignin;
