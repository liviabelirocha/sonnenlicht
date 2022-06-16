const { Router } = require("express");

const db = require("../models");

const userRoute = require("./user-routes");
const authRoute = require("./auth-routes");
const offerRoute = require("./offer-routes");

const router = Router();

router.use("/api/user", userRoute);
router.use("/api", authRoute);
router.use("/api", offerRoute);

router.get("/api/roles", async (req, res) => {
  const roles = await db.Role.findAll();

  return res.status(200).json(roles);
});

module.exports = router;
