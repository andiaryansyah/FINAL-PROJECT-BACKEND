const { Sequelize } = require('sequelize');
const { applyRelation } = require('./relation');

const db = new Sequelize('sql6513456','sql6513456','mGPYvANGDb',{
    host:"sql6.freesqldatabase.com",
    dialect:"mysql"
});

const modelDefiners = [
    require('./models/user.model'),
    require('./models/recipe.model'),
    require('./models/auth.model'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(db);
}

applyRelation(db);

module.exports = db;