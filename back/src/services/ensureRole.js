const db = require("../models");
const HttpError = require("../utils/HttpError");

const is = (roles) => {
  return async (req, res, next) => {
    const { user_id } = req;

    const user = await db.User.findOne({
      where: { id: user_id },
      include: [{ model: db.Role, as: "Role" }],
    });

    if (!user) return next(new HttpError(400, "User not found"));

    const userHasRole = roles.includes(user.Role.name);

    if (!userHasRole) return next(new HttpError(403), "User role error");

    next();
  };
};

module.exports = is;
