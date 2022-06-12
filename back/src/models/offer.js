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
      offerType: DataTypes.ENUM("rent", "sell"),
      propertyType: DataTypes.ENUM("small house", "apartment", "mansion"),
      status: DataTypes.ENUM("approved", "pending", "rejected", "closed"),
      addressLocation: DataTypes.STRING,
      addressNumber: DataTypes.INTEGER,
      addressStreet: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "Offers",
    }
  );
  return Offer;
};
