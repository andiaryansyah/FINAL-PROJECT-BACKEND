const express = require('express');
const { errorHandler } = require('./middleware')
const userRoutes = require('./routes/users.route');
const authRoutes = require('./routes/auth.route');

const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.use('*', (req, res, next) => {
    res.status(404).json({error: `unknown route`});
});

module.exports = app;