const router = require('express').Router();
const getSnapshot = require('../middleware/getSnapshot');

router.route('/api/humans').get(async (req, res) => {
  const data = await getSnapshot(req);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data.results));
});

module.exports = router;
