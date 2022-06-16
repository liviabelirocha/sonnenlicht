const db = require("../models");
const HttpError = require("../utils/HttpError");

module.exports = {
  async list(req, res) {
    const offers = await db.Offer.findAll();
    return res.status(200).json(offers);
  },

  async listOwner(req, res) {
    const { user_id } = req;
    const offers = await db.Offer.findAll({ where: { owner_id: user_id } });
    return res.status(200).json(offers);
  },

  async get(req, res, next) {
    const { id } = req.params;

    const offer = await db.Offer.findOne({ where: { id } });

    if (!offer) next(new HttpError(404, "Not Found"));

    return res.status(200).json(offer);
  },

  async owner(req, res) {},

  async approve(req, res, next) {},

  async reject(req, res, next) {},

  async retry(req, res, next) {},

  async create(req, res, next) {},
};
