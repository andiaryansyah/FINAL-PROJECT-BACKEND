const express = require('express');
const authHandlers = require('../handlers/auth')

const router = express.Router();

router.post('/login', authHandlers.login);
router.post('/token', authHandlers.refreshAccessToken);

module.exports = router;