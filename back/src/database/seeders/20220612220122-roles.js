"use strict";
const { v4: UUIDV4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: UUIDV4(),
          name: "Owner",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: UUIDV4(),
          name: "Admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
