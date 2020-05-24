const { updateUserData } = require('../helpers/updateUserData');

const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.route('/api/verify-email').get(async (req, res, next) => {
  try {
    const { user_id } = jwt.verify(req.query.t, process.env.JWT_SECRET);

    const userData = await updateUserData(
      user_id,
      { email_verified: true },
      req.accessToken
    );

    res.json(userData.data);
  } catch (e) {
    // console.log(e);
    next(e);
  }
});

module.exports = router;
