const express = require('express');
const { verifyToken } = require("../middleware");
const { checkError } = require('../helpers')
const handlers = require('../handlers/recipes')


const router = express.Router({ mergeParams: true });
router.post('/users/:userId/recipes', verifyToken, checkError(handlers.createRecipe));
router.get('/recipes', checkError(handlers.getAllRecipe));
router.get('/users/:userId/recipes', verifyToken, checkError(handlers.getAllByUserId));
router.get('/users/:userId/recipes/:id',  checkError(handlers.getById));
router.put('/users/:userId/recipes/:id', verifyToken, checkError(handlers.updateRecipe));
router.delete('/users/:userId/recipes/:id', verifyToken, checkError(handlers.deleteRecipe));

module.exports = router;