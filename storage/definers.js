const { Sequelize } = require('sequelize');
const { applyRelation } = require('./relation');

//check
const db = new Sequelize('finprodb','root','Ary12345', {
    // host:"",
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