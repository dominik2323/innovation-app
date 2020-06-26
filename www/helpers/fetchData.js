const axios = require('axios');
const absoluteUrl = require('./absoluteUrl');
import { Cookies } from 'react-cookie';

export async function fetchData(req, lang) {
  const baseUrl = absoluteUrl(req, 'localhost:3000');
  const apiUrl = (endpoint) =>
    process.env.NODE_ENV === 'production'
      ? `${baseUrl}/api/${endpoint}?lang=${lang}`
      : `http://localhost:9999/api/${endpoint}?lang=${lang}`;

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
    return null;
  }
}
