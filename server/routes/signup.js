const router = require('express').Router();
const axios = require('axios');
const { sendEmailTemplate } = require('../helpers/sendEmailTemplate');
const jwt = require('jsonwebtoken');
const absoluteUrl = require('../../www/helpers/absoluteUrl');
const strings = require('../../globals/strings');

router.route('/api/signup').post(async (req, res, next) => {
  const lang = req.query.lang || 'en';
  const baseUrl = absoluteUrl(req, 'localhost:3000');

  try {
    const createUser = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
      {
        connection: 'Username-Password-Authentication',
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        user_metadata: {
          phone: req.body.phone,
          isAllowed: false,
        },
      },
      {
        headers: {
          authorization: `Bearer ${req.accessToken}`,
        },
      }
    );

    // include email and name allows user to send multiple verification e-mails
    const token = jwt.sign(
      {
        user_id: createUser.data.user_id,
        email: createUser.data.email,
        name: createUser.data.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    await sendEmailTemplate({
      content: {
        header: strings[lang].auth_email_verification_header,
        instructions: strings[lang].auth_email_verification_instructions,
        url: `${baseUrl}${lang}/verify-email?t=${token}`,
        cta: strings[lang].button_verify,
        disclaimer: strings[lang].auth_email_verification_disclaimer,
      },
      sendTo: createUser.data.email,
      subject: strings[lang].auth_email_verification_subject,
      sendToName: createUser.data.name,
    });

    res.status(createUser.status).send(token);
  } catch (e) {
    if (e.response && e.response.data.statusCode === 409) {
      const message = strings[lang].auth_error_user_already_exists;
      const error = new Error(message);
      error.status = 409;
      next(error);
    }
    next(e);
  }
});

module.exports = router;
