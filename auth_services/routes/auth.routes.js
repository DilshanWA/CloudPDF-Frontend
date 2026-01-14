// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const { signup, login, } = require("../controllers/auth.controller");
const { me } = require("../controllers/authme.controller");
const { route } = require("../app");

router.post("/signup", signup);
router.post("/login", login);
router.post("/authme", me);

module.exports = router;
