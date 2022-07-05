"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, {
        as: "Role",
        foreignKey: {
          name: "role_id",
          allowNull: false,
        },
      });
      this.hasOne(models.Admin, {
        as: "Admin",
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
      this.hasOne(models.Owner, {
        as: "Owner",
        foreignKey: {
          name: "user_id",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      phone_number: DataTypes.STRING,
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
