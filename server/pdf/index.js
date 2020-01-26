const createPdf = require('./createPdf');
const axios = require('axios');
const absoluteUrl = require('../../www/helpers/absoluteUrl');

module.exports = async (req, res) => {
  const baseUrl = absoluteUrl(req, 'localhost:9999');

  const apiUrl = endpoint =>
    process.env.NODE_ENV === 'production'
      ? `${baseUrl}/api/${endpoint}`
      : `http://localhost:9999/api/${endpoint}`;

  const innovationsData = await axios.get(
    apiUrl(`innovations?uid=${req.query.uid}&lang=${req.query.lang}`)
  );
  const humansData = await axios.get(apiUrl(`humans?lang=${req.query.lang}`));

  return await createPdf(
    innovationsData.data,
    humansData,
    req.query.lang.split('-')[0]
  );
};
