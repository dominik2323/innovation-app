const express = require('express');

const router = express.Router();

// data routes
router.use(require('./about'));
router.use(require('./humans'));
router.use(require('./innovations'));
router.use(require('./pdf'));

// auth routes
router.use(require('./login'));
router.use(require('./verifyUser'));
router.use(require('./signup'));
router.use(require('./verifyEmail'));
router.use(require('./requestChangePassword'));
router.use(require('./changePassword'));
router.use(require('./testSendgrid'));
router.use(require('./resendVerificationEmail'));

module.exports = router;
