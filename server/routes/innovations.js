const router = require('express').Router();
const getSnapshot = require('../middleware/getSnapshot');

router.route('/api/innovations').get(async (req, res) => {
  // TODO handle pdf route for specific innovation or get all innovations in pdf and then use method find by uid
  const data = await getSnapshot(req);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

module.exports = router;
