"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Offer, {
        as: "Offers",
        foreignKey: {
          name: "owner_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
      this.belongsTo(models.User, {
        as: "User",
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    }
  }
  Owner.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
    },
    {
      sequelize,
      modelName: "Owner",
      tableName: "Owners",
    }
  );
  return Owner;
};
