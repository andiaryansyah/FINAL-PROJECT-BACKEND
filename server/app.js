const express = require('express');
const fileupload = require("express-fileupload");
const { errorHandler } = require('./middleware')
const userRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.route');
const recipeRoutes = require('./routes/recipes.route');

const app = express();


app.use(express.json());
app.use(fileupload());

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/users/:userId/recipes', recipeRoutes);

app.use(errorHandler);

app.use('*', (req, res, next) => {
    res.status(404).json({error: `unknown route`});
});

module.exports = app;