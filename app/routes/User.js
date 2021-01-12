const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("user");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`user ${id}`);
});

module.exports = router;
