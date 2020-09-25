const router = require('express').Router();
const { sendEmailTemplate } = require('../helpers/sendEmailTemplate');
const jwt = require('jsonwebtoken');
const strings = require('../../globals/strings.json');
const absoluteUrl = require('../../www/helpers/absoluteUrl');

router.route('/api/resend-email').post(async (req, res, next) => {
  const baseUrl = absoluteUrl(req, 'localhost:3000');
  const lang = req.query.lang || 'en';
  try {
    const { email, name } = jwt.verify(req.body.token, process.env.JWT_SECRET);
    await sendEmailTemplate({
      content: {
        header: strings[lang].auth_email_verification_header,
        instructions: strings[lang].auth_email_verification_instructions,
        url: `${baseUrl}${lang}/verify-email?t=${req.body.token}`,
        cta: strings[lang].button_verify,
        disclaimer: strings[lang].auth_email_verification_disclaimer,
      },
      sendTo: email,
      subject: strings[lang].auth_email_verification_subject,
      sendToName: name,
    });
    res.status(200).send(strings[lang].auth_signup_success_email_delivered);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
