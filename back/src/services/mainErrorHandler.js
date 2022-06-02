const mainErrorHandler = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);

  res.json({
    message:
      req.headers.verbose === "true" && error.verbose
        ? error.verbose
        : error.message || "Erro na API.",
  });
};

module.exports = mainErrorHandler;
