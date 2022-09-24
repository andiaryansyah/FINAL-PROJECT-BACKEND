const { Sequelize } = require('sequelize');
const { applyRelation } = require('./relation');

//check
const db = new Sequelize('finprodb','admin','Admin12345', {
    host:"mssql-89019-0.cloudclusters.net",
    port:'19781',
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