const Prismic = require('prismic-javascript');

async function withApi(req, res, next) {
  req.apiRef = await Prismic.getApi('https://inolog.cdn.prismic.io/api/v2', {
    req,
  });
  next();
}

exports.withApi = withApi;
