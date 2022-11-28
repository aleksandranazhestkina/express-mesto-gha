const ERROR_CODE_UNAUTHORIZED = 401;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = ERROR_CODE_UNAUTHORIZED;
  }
};

module.exports = UnauthorizedError;
