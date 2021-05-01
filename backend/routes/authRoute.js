const express = require("express");
const router = express.Router();

// controller import
const authController = require("../controller/authController");

// routes
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

module.exports = router;
