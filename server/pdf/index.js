const createPdf = require('./createPdf');
const axios = require('axios');
const url = require('url');

const absoluteUrl = (req, setLocalhost) => {
  let protocol = 'https';
  let host = req ? req.headers.host : window.location.hostname;

  if (host.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = 'http';
  }

  return url.format({
    protocol,
    host,
    pathname: '/', // req.url
  });
};

module.exports = async (req, res) => {
  const baseUrl = absoluteUrl(req, 'localhost:9999');
  const apiUrl = endpoint =>
    process.env.NODE_ENV === 'production'
      ? `${baseUrl}/api/${endpoint}`
      : `http://localhost:9999/api/${endpoint}`;

  const innovationsData = await axios.get(
    apiUrl(`innovations?uid=${req.query.uid}`)
  );
  const humansData = await axios.get(apiUrl(`humans`));

  return await createPdf(innovationsData.data, humansData);
};
