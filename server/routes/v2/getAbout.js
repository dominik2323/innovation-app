const router = require('express').Router();
const { fetchData } = require('./fetchData');
const { APP_LANGS } = require('../../../globals/appLangs');

router.route('/api/v2/get-about').get(async (req, res, next) => {
  const lang = APP_LANGS[req.query.lang] || `en-gb`;

  try {
    const data = await fetchData(`
      {
        allAbouts(lang: "${lang}") {
          edges {
            node {
              directorname
              directorposition
              abouttext
              directorphoto
              _meta {
                id
                uid
              }
            }
          }
        }
      }
    `);
    res.json(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
