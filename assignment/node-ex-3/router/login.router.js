const express = require("express");
const loginController = require("../controller/login.controller");

const router = express.Router();

router.route("/login").post(loginController);

module.exports = router;
