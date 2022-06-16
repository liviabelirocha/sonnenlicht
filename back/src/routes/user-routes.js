const { Router } = require("express");

const controller = require("../controllers/user-controller");
const ensureAuth = require("../services/ensureAuth");
const is = require("../services/ensureRole");

const router = Router();

router.get("/", controller.list);
router.get("/:id", controller.get);
router.patch("/:id", ensureAuth, is("Admin"), controller.patch);
router.put("/:id", ensureAuth, is(["Owner", "Admin"]), controller.update);
router.delete("/:id", ensureAuth, is(["Owner", "Admin"]), controller.delete);

module.exports = router;
