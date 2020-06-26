const axios = require('axios');

function updateUserData(userId, attributes = {}, accessToken) {
  return axios.patch(
    `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
    attributes,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

exports.updateUserData = updateUserData;
