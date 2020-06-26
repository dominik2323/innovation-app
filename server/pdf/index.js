const createPdf = require('./createPdf');
const axios = require('axios');
const absoluteUrl = require('../../www/helpers/absoluteUrl');

module.exports = async (req, res) => {
  const baseUrl = absoluteUrl(req, 'localhost:9999');

  const apiUrl = (endpoint) =>
    process.env.NODE_ENV === 'production'
      ? `${baseUrl}/api/${endpoint}`
      : `http://localhost:9999/api/${endpoint}`;

  // TODO: include token to fetch download links and humans
  const innovationsData = await axios.get(
    apiUrl(`innovations?lang=${req.query.lang}`)
  );

  const humansData = await axios.get(apiUrl(`humans?lang=${req.query.lang}`));
  return await createPdf(
    innovationsData.data.results.find((res) => res.uid === req.query.uid).data,
    humansData.data,
    req.query.lang.split('-')[0]
  );
};
