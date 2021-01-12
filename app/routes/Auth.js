const express = require("express");
const { register, login, checkAuth } = require("../controllers/Auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", checkAuth);

module.exports = router;
