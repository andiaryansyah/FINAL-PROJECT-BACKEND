const express = require('express');
const app = express();

app.use(express.json());

app.use('*', (req, res, next) => {
    res.status(404).json({error: `unknown route`});
});

module.exports = app;