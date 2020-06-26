function createError(message, statusCode) {
  const error = new Error(message);
  error.status = statusCode;
  return error;
}

exports.createError = createError;
