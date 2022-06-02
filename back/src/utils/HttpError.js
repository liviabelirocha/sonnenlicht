class HttpError extends Error {
  constructor(statusCode, message) {
    message = super(message);
    this.code = statusCode;
  }

  toJSON() {
    return {
      HttpError: {
        code: this.code,
        message: this.message,
      },
    };
  }
}

module.exports = HttpError;
