"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Offers", "description", {
      allowNull: true,
      type: Sequelize.TEXT,
    });

    await queryInterface.addColumn("Offers", "bathroom_quantity", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("Offers", "bedroom_quantity", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("Offers", "parking_slot_quantity", {
      allowNull: false,
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("Offers", "area", {
      allowNull: false,
      type: Sequelize.DECIMAL,
    });
  },
  // async down(queryInterface, Sequelize) {
  //   await queryInterface.dropTable("Users");
  // },
};
