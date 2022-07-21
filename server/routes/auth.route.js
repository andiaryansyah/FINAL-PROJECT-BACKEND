const express = require('express');
const authHandlers = require('../handlers/auth')

const router = express.Router();

router.post('/login', authHandlers.login);
router.post('/token', authHandlers.refreshAccessToken);
router.delete('/logout', authHandlers.Logout);

module.exports = router;