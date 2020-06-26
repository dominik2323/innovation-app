const router = require('express').Router();
const getSnapshot = require('../middleware/getSnapshot');

router.route('/api/about').get(async (req, res) => {
  const data = await getSnapshot(req);

  res.setHeader('Content-Type', 'application/json');
  res.json(data.results[0].data);
});

module.exports = router;
