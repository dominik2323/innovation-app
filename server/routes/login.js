const router = require('express').Router();
const AuthClient = require('auth0').AuthenticationClient;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const strings = require('../../globals/strings');

const initAuthClient = new AuthClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

router.route('/api/login').post(async (req, res, next) => {
  const lang = req.query.lang || 'en';
  try {
    initAuthClient.passwordGrant(
      {
        username: req.body.email,
        password: req.body.password,
        realm: 'Username-Password-Authentication',
      },
      (err, user) => {
        // invalid credentials
        if (err && err.statusCode === 403) {
          console.log(req.body.password);
          const message = strings[lang].auth_error_invalid_grant;
          const error = new Error(message);
          error.status = 403;

          next(error);
          return;
        }

        // too many attempts to login and blocked account
        // TODO: send e-mail to unblock an account from here, and create an endpoint on frontend
        if (err && err.statusCode === 429) {
          const message = strings[lang].auth_error_too_many_attempts;
          const error = new Error(message);
          error.status = 429;

          next(error);
          return;
        }

        // account is blocked
        if (err && err.statusCode === 401) {
          const message = strings[lang].auth_error_unauthorized;
          const error = new Error(message);
          error.status = 401;

          next(error);
          return;
        }

        // other errors
        if (err) {
          next(err);
          return;
        }

        const userData = jwt.decode(user.id_token);

        // user's email is not verified yet
        // TODO: send user an verification e-mail again
        if (!userData.email_verified) {
          const message = strings[lang].auth_error_email_not_verified;
          const error = new Error(message);
          error.status = 401;

          next(error);
          return;
        }

        const token = jwt.sign({ userData }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        res.send(token);
      }
    );
  } catch (e) {
    next(e);
  }
});

module.exports = router;
