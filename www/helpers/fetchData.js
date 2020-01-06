const axios = require('axios');
const url = require('url');

export const absoluteUrl = (req, setLocalhost) => {
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

export async function fetchData(req) {
  const baseUrl = absoluteUrl(req, 'localhost:3000');
  const apiUrl = endpoint =>
    process.env.NODE_ENV === 'production'
      ? `${baseUrl}/api/${endpoint}`
      : `http://localhost:9999/api/${endpoint}`;

  const humans = axios.get(apiUrl('humans'));
  const about = axios.get(apiUrl('about'));
  const innovations = axios.get(apiUrl('innovations'));

  try {
    const [humansData, aboutData, innovationsData] = await Promise.all([
      humans,
      about,
      innovations,
    ]);
    return {
      innovations: innovationsData.data,
      humans: humansData.data,
      about: aboutData.data,
    };
  } catch (ex) {
    console.log(`Error fetching data from ${apiUrl} - ${ex.message}`);
    return { user: null };
  }
}
