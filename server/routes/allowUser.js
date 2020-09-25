const { updateUserData } = require('../helpers/updateUserData');
const absoluteUrl = require('../../www/helpers/absoluteUrl');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { sendEmailTemplate } = require('../helpers/sendEmailTemplate');
const strings = require('../../globals/strings.json');

router.route('/api/allow-user').get(async (req, res, next) => {
  const lang = req.query.lang || 'en';
  const payload = JSON.parse(req.query.payload);
  try {
    const { user_id, email, name } = jwt.verify(
      req.query.t,
      process.env.JWT_SECRET
    );

    const userData = await updateUserData(
      user_id,
      { user_metadata: payload },
      req.accessToken
    );

    const baseUrl = absoluteUrl(req, 'localhost:3000');
    if (payload.isAllowed) {
      await sendEmailTemplate({
        content: {
          header: strings[lang].auth_email_user_verified_header,
          instructions: strings[lang].auth_email_user_verified_instructions,
          url: `${baseUrl}${lang}/login`,
          cta: strings[lang].button_login,
          disclaimer: strings[lang].auth_email_user_verification_disclaimer,
        },
        sendTo: email,
        subject: strings[lang].auth_email_user_verified_subject,
        sendToName: name,
      });
    } else {
      await sendEmailTemplate({
        content: {
          header: strings[lang].auth_email_user_blocked_header,
          instructions: strings[lang].auth_email_user_blocked_instructions,
          url: `mailto:info@inolog.cz`,
          cta: strings[lang].button_contact_us,
          disclaimer: strings[lang].auth_email_verification_disclaimer,
        },
        sendTo: email,
        subject: strings[lang].auth_email_user_blocked_subject,
        sendToName: name,
      });
    }

    res.json(userData.data);
  } catch (e) {
    console.log(e.response.body);
    next(e);
  }
});

module.exports = router;
