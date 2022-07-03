const { UUIDV4 } = require("sequelize");
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

  async owner(req, res) {
    const { id } = req.params;

    const offer = await db.Offer.findOne({ where: { id } });

    return res.status(200).json(offer.Owner);
  },

  async approve(req, res, next) {
    const { id } = req.params;

    const offer = await db.Offer.findOne({ where: { id } });

    if (!offer) next(new HttpError(404, "Not Found"));

    const offerUpdated = await db.Offer.update(
      { status: "approved" },
      { where: { id } }
    );

    return res.status(200).json(offerUpdated);
  },

  async reject(req, res, next) {
    const { id } = req.params;

    const offer = await db.Offer.findOne({ where: { id } });

    if (!offer) next(new HttpError(404, "Not Found"));

    const offerUpdated = await db.Offer.update(
      { status: "rejected" },
      { where: { id } }
    );

    return res.status(200).json(offerUpdated);
  },

  async retry(req, res, next) {
    const { id } = req.params;

    const offer = await db.Offer.findOne({ where: { id } });

    if (!offer) next(new HttpError(404, "Not Found"));

    const offerUpdated = await db.Offer.update(
      { status: "pending" },
      { where: { id } }
    );

    return res.status(200).json(offerUpdated);
  },

  async create(req, res, next) {
    const {
      price,
      title,
      offerType,
      propertyType,
      addressLocation,
      addressNumber,
      addressStreet,
    } = req.body;

    const offer = await db.Offer.create({
      id: UUIDV4(),
      price: price,
      title: title,
      offer_type: offerType,
      property_type: propertyType,
      address_location: addressLocation,
      address_number: addressNumber,
      address_street: addressStreet,
      status: "pending",
    });

    return res.json(200).json(offer);
  },
};
