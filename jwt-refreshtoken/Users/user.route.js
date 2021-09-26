const express = require('express');
const router = express.Router();
const UserCrl = require('./users.controller')

// routes
router.post('/authenticate', UserCrl.authenticate);
router.post('/refresh_token', UserCrl.refreshToken);
router.post('/token/reject', UserCrl.rejectToken);
router.get('/', UserCrl.getAll);

module.exports = router;