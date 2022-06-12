"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Offers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      price: DataTypes.DECIMAL,
      title: DataTypes.STRING,
      offerType: DataTypes.ENUM("rent", "sell"),
      propertyType: DataTypes.ENUM("small house", "apartment", "mansion"),
      status: DataTypes.ENUM("approved", "pending", "rejected", "closed"),
      addressLocation: DataTypes.STRING,
      addressNumber: DataTypes.INTEGER,
      addressStreet: DataTypes.STRING,
      owner_id: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: "Owners",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Offers");
  },
};
