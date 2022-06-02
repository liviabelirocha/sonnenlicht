const { sequelize } = require("../models");

const checkDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (err) {
    console.error("Error conecting to the database.", err.message);
  }
};

module.exports = checkDatabaseConnection;
