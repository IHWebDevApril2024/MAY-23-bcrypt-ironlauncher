const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.get("/users", (req, res, next) => {
  res.json("All users in here");
});

module.exports = router;
