"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, {
        as: "Users",
        foreignKey: {
          name: "role_id",
          allowNull: false,
        },
        onDelete: "SET NULL",
      });
    }
  }
  Role.init(
    {
      id: { type: DataTypes.UUID, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "Roles",
    }
  );
  return Role;
};
