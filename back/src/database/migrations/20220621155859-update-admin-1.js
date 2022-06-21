"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Admins", "user_id", {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },
  // async down(queryInterface, Sequelize) {
  //   await queryInterface.dropTable("Users");
  // },
};
