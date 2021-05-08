const express = require("express");
const router = express.Router();

// controller import
const authController = require("../controller/authController");

// routes
router.route("/login").get(authController.login).post(authController.login);
router
	.route("/register")
	.get(authController.register)
	.post(authController.register);

router
	.route("/:id")
	.patch(authController.updateUser)
	.delete(authController.deleteUser);

module.exports = router;
