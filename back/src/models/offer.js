"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Owner, {
        as: "Owner",
        foreignKey: {
          name: "owner_id",
          allowNull: false,
        },
        onDelete: "SET NULL",
      });
    }
  }
  Offer.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      price: DataTypes.DECIMAL,
      title: DataTypes.STRING,
      offer_type: DataTypes.ENUM("rent", "sell"),
      property_type: DataTypes.ENUM("small house", "apartment", "mansion"),
      status: DataTypes.ENUM("approved", "pending", "rejected", "closed"),
      address_location: DataTypes.STRING,
      address_number: DataTypes.INTEGER,
      address_street: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "Offers",
    }
  );
  return Offer;
};
