const express = require('express');
const { verifyToken } = require("../middleware");
const { checkError } = require('../helpers')

const handlers = require('../handlers/users')

const router = express.Router();

router.get('/', checkError(handlers.getAllUsers));
router.post('/', checkError(handlers.register));
router.get('/:id', checkError(handlers.getByIdUser));
router.delete('/:id', verifyToken, checkError(handlers.deleteUser));


module.exports = router;