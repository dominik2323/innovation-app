const Prismic = require('prismic-javascript');

async function getSnapshot(req) {
  const type = req.url.split('/').pop().split('?')[0];
  // console.log(req.query.lang);
  return await req.apiRef.query(Prismic.Predicates.at('document.type', type), {
    pageSize: 1000,
    lang: req.query.lang,
  });
}

module.exports = getSnapshot;
