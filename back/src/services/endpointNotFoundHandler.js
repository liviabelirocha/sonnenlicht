const HttpError = require("../utils/HttpError");

const endpointNotFoundHandler = (req, res, next) => {
  const error = new HttpError(
    404,
    `Erro 404: O endpoint ${req.originalUrl} não foi encontrado.`
  );

  next(error);
};

module.exports = endpointNotFoundHandler;
