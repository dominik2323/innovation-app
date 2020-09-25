const router = require('express').Router();
const { validateToken } = require('../helpers/validateToken');

router.get('/api/verify-token', (req, res, next) => {
  const token = req.query.t || null;

  if (!token) {
    next(new Error('Token must be provided'));
    return;
  }

  const { isTokenValid, decoded } = validateToken(token);

  if (!isTokenValid) {
    const error = new Error('Token is invalid');
    error.status = 401;
    next(error);
    return;
  }

  res.json({ userData: decoded });
});

module.exports = router;
