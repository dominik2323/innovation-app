const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.route('/api/verify-user').post((req, res, next) => {
  const notAuthorized = new Error('Not authorized');
  notAuthorized.status = 401;

  jwt.verify(req.body.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      next(notAuthorized);
      return;
    }

    res.json(decoded);
  });
});

module.exports = router;
