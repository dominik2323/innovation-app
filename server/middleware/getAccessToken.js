const axios = require('axios');

async function getAccessToken(req, res, next) {
  const credentials = {
    grant_type: process.env.GRANT_TYPE,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: process.env.AUDIENCE,
  };

  try {
    const res = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      credentials
    );
    req.accessToken = res.data.access_token;
    // console.log(res.data);
  } catch (e) {
    // console.log(e);
  }

  next();
}

exports.getAccessToken = getAccessToken;
