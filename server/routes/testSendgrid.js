const router = require('express').Router();
const sgMail = require('@sendgrid/mail');

router.route('/api/test-sendgrid').get(async (req, res, next) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
    await sgMail.send({
      from: 'skoda.inolog@gmail.com',
      to: 'dominik.tomcik23@gmail.com',
      html: 'hello',
      subject: 'heelooo bitch',
    });
    res.json({ status: 201 });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
