function applyRelation(sequelize) {
    const { user, recipe, auth } = sequelize.models;

    user.hasMany(recipe, { foreignKey: 'user_id' });
    recipe.belongsTo(user);

    auth.belongsTo(user, { foreignKey: 'user_id' });
}

module.exports = { applyRelation };