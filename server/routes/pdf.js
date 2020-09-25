const router = require('express').Router();
const absoluteUrl = require('../../www/helpers/absoluteUrl.js');
const { APP_LANGS } = require('../../globals/appLangs.js');
const Axios = require('axios');
const createPdf = require('../pdf/createPdf.js');

router.route('/api/pdf').get(async (req, res, next) => {
  const baseUrl = absoluteUrl(req, 'localhost:9999');
  const lang = req.query.lang || 'en';
  const token = req.query.token || ``;
  const uid = req.query.uid;

  if (!APP_LANGS[lang]) {
    next(new Error('invalid language. allowed values: en, de, cs'));
    return;
  }

  if (!uid) {
    next(new Error('uid must be provided'));
    return;
  }

  try {
    const innovationsData = await Axios.get(
      `${baseUrl}api/v2/get-innovations?token=${token}&lang=${lang}&uid=${uid}`
    );

    const pdf = await createPdf(innovationsData.data[0].node, lang);

    res.setHeader(
      'Content-disposition',
      `attachment; filename=${req.query.uid}.pdf`
    );
    res.setHeader('Content-type', 'application/pdf');

    res.send(pdf);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
