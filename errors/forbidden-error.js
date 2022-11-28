const ERROR_CODE_FORBIDDEN = 403;

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = ERROR_CODE_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
