const db = require("../models");

module.exports = {
  async get(req, res) {
    const { id } = req.params;

    const user = await db.User.findOne({
      where: { id },
      include: [{ model: db.Role, as: "Role" }],
    });

    return res.status(200).json(user);
  },

  async patch(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    const newRole = await db.Role.findOne({
      where: { name: role },
    });

    await db.User.update(
      { role_id: newRole.id },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { phone_number, name } = req.body;

    await db.User.update(
      { phone_number, name },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).send();
  },

  async list(req, res) {
    const users = await db.User.findAll({
      include: [{ model: db.Role, as: "Role" }],
    });

    return res.status(200).json(users);
  },

  async delete(req, res) {
    const { id } = req.params;

    await db.User.destroy({
      where: {
        id,
      },
    });

    return res.status(204).send();
  },
};
