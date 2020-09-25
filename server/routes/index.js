const express = require('express');

const router = express.Router();

// data routes
router.use(require('./pdf'));
router.use(require('./v2/getInnovations'));
router.use(require('./v2/getAbout'));

// auth routes
router.use(require('./login'));
router.use(require('./verifyUser'));
router.use(require('./signup'));
router.use(require('./verifyEmail'));
router.use(require('./requestChangePassword'));
router.use(require('./changePassword'));
router.use(require('./resendVerificationEmail'));
router.use(require('./allowUser'));
router.use(require('./verifyToken'));

module.exports = router;
