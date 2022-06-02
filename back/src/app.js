require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const ymlfile = require("./documentation/ymldoc");

const checkDatabaseConnection = require("./services/checkDatabaseConnection");
const endpointNotFoundHandler = require("./services/endpointNotFoundHandler");
const mainErrorHandler = require("./services/mainErrorHandler");

//Routes

(async () => {
  await checkDatabaseConnection();
})();

const app = express();

//Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cors());

//App routing

//docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(ymlfile));

//404 handler
app.use((req, res, next) => endpointNotFoundHandler(req, res, next));

//Main error handler
app.use((error, req, res, next) => mainErrorHandler(error, req, res, next));

module.exports = app;
