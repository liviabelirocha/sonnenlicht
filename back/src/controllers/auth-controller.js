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

    const transaction = await db.sequelize.transaction();

    try {
      const user = await db.User.create(
        {
          id: UUIDV4(),
          name,
          password: bcryptedPassword,
          email,
          phone_number,
          role_id: roleExists.id,
        },
        { transaction }
      );

      await db[`${roleExists.name}`].create(
        {
          id: UUIDV4(),
          user_id: user.id,
        },
        { transaction }
      );

      await transaction.commit();

      return res.status(201).json(user);
    } catch (err) {
      await transaction.rollback();

      return next(
        new HttpError(
          err.statusCode ? err.statusCode : 402,
          err.message
            ? err.message
            : "Failed to create user with the given credentials"
        )
      );
    }
  },

  async auth(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new HttpError(402, "Wrong email/password"));

    const user = await db.User.findOne({ where: { email } });

    if (!user) return next(new HttpError(401, "Wrong email/password"));

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) return next(new HttpError(401, "Wrong email/password"));

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
