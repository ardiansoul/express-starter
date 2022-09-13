const router = require("express").Router();
const {user} = require("../api_path")
router.get(user.get_all, (req, res) => {
  res.send("user");
});

router.get(user.get, (req, res) => {
  const { id } = req.params;
  res.send(`user ${id}`);
});

module.exports = router;
