const { genSalt, hash, compare } = require("bcrypt");
const { v4: UUIDV4 } = require("uuid");

const db = require("../models");
const generateJwt = require("../services/generateJwt");

const HttpError = require("../utils/HttpError");

module.exports = {
  async create(req, res, next) {
    const { name, password, email, phone_number, role } = req.body;

    const userAlreadyExists = await db.User.findOne({ where: { email } });

    if (userAlreadyExists)
      return next(new HttpError(400, "User already exists"));

    const roleExists = await db.Role.findOne({ where: { name: role } });

    if (!roleExists) {
      return next(new HttpError(402, "Invalid role"));
    }

    const saltRound = 10;
    const salt = await genSalt(saltRound);
    const bcryptedPassword = await hash(password, salt);

    const user = await db.User.create({
      id: UUIDV4(),
      name,
      password: bcryptedPassword,
      email,
      phone_number,
      role_id: roleExists.id,
    });

    return res.status(201).json(user);
  },

  async auth(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) next(new HttpError(400, "Wrong email/password"));

    const user = await db.User.findOne({ where: { email } });

    if (!user) next(new HttpError(400, "Wrong email/password"));

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) next(new HttpError(400, "Wrong email/password"));

    const token = generateJwt(user.id, user.email, user.role, user.name);

    return res.status(200).json(token);
  },

  async reset(req, res) {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });

    if (password != user.password) next(new HttpError(400, "Invalid password"));

    const users = await db.User.findAll();

    return res.status(200).json(users);
  },
};
