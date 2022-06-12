"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Offers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      price: Sequelize.DECIMAL,
      title: Sequelize.STRING,
      offer_type: Sequelize.ENUM("rent", "sell"),
      property_type: Sequelize.ENUM("small house", "apartment", "mansion"),
      status: Sequelize.ENUM("approved", "pending", "rejected", "closed"),
      address_location: Sequelize.STRING,
      address_number: Sequelize.INTEGER,
      address_street: Sequelize.STRING,
      owner_id: {
        allowNull: false,
        type: Sequelize.Sequelize.UUID,
        references: {
          model: {
            tableName: "Owners",
          },
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Offers");
  },
};
