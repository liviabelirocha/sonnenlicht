const db = require("../models");

const is = (roles) => {
  return async (req, res, next) => {
    const { user_id } = req;

    const user = await db.User.findOne({
      where: { id: user_id },
      include: [{ model: db.Role, as: "Role" }],
    });

    if (!user) return res.status(400).json("User not found");

    const userHasRole = roles.includes(user.Role.name);

    if (!userHasRole) return res.status(403).end();

    next();
  };
};

module.exports = is;
