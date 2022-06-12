"use strict";
const { v4: UUIDV4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const role = await queryInterface.sequelize.query(
      `SELECT id from "Roles" WHERE name='Owner';`
    );
    const password = "123456";
    const saltRound = 10; //used in bcrypt method to generate hash password
    const salt = await bcrypt.genSalt(saltRound);
    let bcryptedPassword;
    bcryptedPassword = await bcrypt.hash(password, salt);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: UUIDV4(),
          name: "Teste Owner",
          password: bcryptedPassword,
          email: "teste@teste.com",
          phone_number: "9999999999999",
          role_id: role[0][0].id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
