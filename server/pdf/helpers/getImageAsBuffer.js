const axios = require('axios');

module.exports = async function getImageAsBuffer(url) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  return Buffer.from(response.data);
};
