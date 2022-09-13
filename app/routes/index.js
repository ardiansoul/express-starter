const express = require("express");
const router = express.Router();
const V_1 = require("V_1/index")

// import route
const User = require("./User");

// root route
router.get("/", (req, res) => {
  res.send("router api");
});

// use route
router.use("/v1", V_1);

module.exports = router;
