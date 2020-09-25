const jwt = require('jsonwebtoken');

function validateToken(token) {
  let isTokenValid, decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    isTokenValid = true;
  } catch (e) {
    isTokenValid = false;
    decoded = null;
  }
  return { isTokenValid, decoded };
}

exports.validateToken = validateToken;
