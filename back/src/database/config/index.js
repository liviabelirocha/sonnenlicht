require("dotenv").config();
const fs = require("fs");
var path = require("path");

const DEV = {
  dialect: process.env.DATABASE_DIALECT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
};

const PROD = {
  dialect: process.env.DATABASE_DIALECT,
  //Connects to Production DATABASE_URL via models/index.js
  use_env_variable: "DATABASE_URL",
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
  define: {
    timestamps: true,
    underscored: true,
  },
};

module.exports = {
  development: DEV,
  production: PROD,
};
