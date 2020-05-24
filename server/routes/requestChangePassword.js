const router = require('express').Router();
const axios = require('axios');
const { sendEmailTemplate } = require('../helpers/sendEmailTemplate');
const strings = require('../../globals/strings');
const jwt = require('jsonwebtoken');
const absoluteUrl = require('../../www/helpers/absoluteUrl');

router.route('/api/request-change-password').post(async (req, res, next) => {
  const lang = req.query.lang || 'en';
  // console.log(lang);
  const email = req.body.email;
  const baseUrl = absoluteUrl(req, 'localhost:3000');

  try {
    const userData = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users-by-email?email=${email}`,
      {
        headers: { authorization: `Bearer ${req.accessToken}` },
      }
    );

    // no user found = empty array
    if (userData.data.length === 0) {
      const error = new Error('user_not_found');
      error.status = 400;
      next(error);
      return;
    }

    const { name, user_id } = userData.data[0];
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    await sendEmailTemplate({
      sendTo: email,
      sendToName: name,
      content: {
        header: strings[lang].auth_email_change_password_header,
        instructions: strings[lang].auth_email_change_password_instructions,
        url: `${baseUrl}${lang}/change-password?t=${token}`,
        cta: strings[lang].button_change,
        disclaimer: strings[lang].auth_email_change_password_disclaimer,
      },
      subject: strings[lang].auth_email_change_password_subject,
    });

    res.json({ user_id: userData.data[0].user_id });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
