const express = require("express");
const router = express.Router();
const signupController = require("../controller/signup.controller");

router.route("/signup").post(signupController);

module.exports = router;
