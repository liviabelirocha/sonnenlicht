const { Router } = require("express");

const controller = require("../controllers/auth-controller");

const router = Router();

router.post("/register", controller.create);
router.post("/auth", controller.auth);
router.patch("/reset-password", controller.reset);

module.exports = router;
