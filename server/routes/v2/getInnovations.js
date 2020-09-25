const router = require('express').Router();
const { fetchData } = require('./fetchData');
const { validateToken } = require('../../helpers/validateToken');
const { APP_LANGS } = require('../../../globals/appLangs');

router.route('/api/v2/get-innovations').get(async (req, res, next) => {
  const token = req.query.token || null;
  const lang = APP_LANGS[req.query.lang] || `en-gb`;
  const uid = req.query.uid ? `"${req.query.uid}"` : null;
  const { isTokenValid, decoded } = validateToken(token);
  const hasCredentials =
    isTokenValid &&
    decoded.userData['https://inolog.cz/isAllowed'].isAllowed &&
    !decoded.userData['https://inolog.cz/isAllowed'].isBlocked;

  try {
    const data = await fetchData(`
      {
        innovations: allInnovationss(uid: ${uid}, lang:"${lang}", sortBy: order_ASC) {
          edges {
            node {
              innovationname
              order
              about
              perex
              motivation
              benefits
              introimage
              slideshow {
                img
                vimeoid
              }
              download @include(if: ${hasCredentials}){
                file {
                  ...on _FileLink {
                    name
                    url
                    size
                  }
                }
                filename
              }
              _meta {
                id
                uid
              }
              is_secret
              authors @include(if: ${hasCredentials}) {
                role
                ...on InnovationsAuthors {
                  humans {
                    ...on Humans {
                      name
                      phone
                      email
                      img
                      _meta {
                        uid
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    const filteredSecretInnovations = data.data.innovations.edges.reduce(
      (acc, curr) => {
        if (hasCredentials) return [...acc, curr];
        if (curr.node.is_secret) return [...acc, { node: {} }];
        return [...acc, curr];
      },
      []
    );

    res.json(filteredSecretInnovations);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
