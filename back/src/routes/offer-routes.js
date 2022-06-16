const { Router } = require("express");

const controller = require("../controllers/offer-controller");
const ensureAuth = require("../services/ensureAuth");
const is = require("../services/ensureRole");

const router = Router();

router.get("/offers", controller.list);
router.get("/my-offers", ensureAuth, is("Owner"), controller.listOwner);
router.get("/offer/:id", controller.get);
router.get("/offer-owner/:id", controller.owner);
router.patch("/approve/:id", ensureAuth, is("Admin"), controller.approve);
router.patch("/reject/:id", ensureAuth, is("Admin"), controller.reject);
router.patch("/retry/:id", ensureAuth, is("Owner"), controller.retry);
router.post("/new-offer", ensureAuth, is("Owner"), controller.create);

module.exports = router;
