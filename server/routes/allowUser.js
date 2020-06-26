const { updateUserData } = require('../helpers/updateUserData');

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { sendEmailTemplate } = require('../helpers/sendEmailTemplate');

router.route('/api/allow-user').get(async (req, res, next) => {
  try {
    const { user_id, email, name } = jwt.verify(
      req.query.t,
      process.env.JWT_SECRET
    );

    const userData = await updateUserData(
      user_id,
      { user_metadata: { isAllowed: true } },
      req.accessToken
    );

    await sendEmailTemplate({
      content: {
        header: `Nyní máte interní verzi brožury`,
        instructions: `Pro správné zobrazení brožury se stačí odhlásit a znovu přihlásit.`,
        url: `${baseUrl}${lang}/login`,
        cta: strings[lang].button_login,
        disclaimer: strings[lang].auth_email_verification_disclaimer,
      },
      sendTo: email,
      subject: `Váš účet byl schválen pro interní verzi`,
      sendToName: name,
    });

    res.json(userData.data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
