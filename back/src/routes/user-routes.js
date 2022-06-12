const { Router } = require("express");
const db = require("../models");

const router = Router();

router.get("/api/test", async (req, res, next) => {
  const user = await db.User.findOne();

  res.status(200).json({ user });
});

module.exports = router;
