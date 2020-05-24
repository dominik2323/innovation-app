const router = require('express').Router();
const pdf = require('../pdf/index.js');

router.route('/api/pdf').get(async (req, res) => {
  res.setHeader(
    'Content-disposition',
    `attachment; filename=${req.query.uid}.pdf`
  );
  res.setHeader('Content-type', 'application/pdf');
  res.send(await pdf(req, res));
});

module.exports = router;
