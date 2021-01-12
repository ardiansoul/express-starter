const express = require("express");
const router = express.Router();

// import route
const User = require("./User");

// root route
router.get("/", (req, res) => {
  res.send("router api");
});

// use route
router.use("/users", User);

module.exports = router;
