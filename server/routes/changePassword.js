const router = require('express').Router();
const axios = require('axios');
const { updateUserData } = require('../helpers/updateUserData');
const strings = require('../../globals/strings.json');
const jwt = require('jsonwebtoken');

router.route('/api/change-password').post(async (req, res, next) => {
  try {
    const { user_id } = jwt.verify(req.body.token, process.env.JWT_SECRET);
    const userData = await updateUserData(
      user_id,
      { password: req.body.password },
      req.accessToken
    );
    res.json(userData.data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
