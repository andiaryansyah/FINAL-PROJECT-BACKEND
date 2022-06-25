const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('recipe',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            recipe: {
                type: DataTypes.STRING,
                allowNull: false
            },
            images: {
                type: DataTypes.STRING,
                allowNull: false
            },
            // We also want it to have a 'merchantId' field, but we don't have to define it here.
            // It will be defined automatically when Sequelize applies the associations
        },
        {
            underscored: true
        });
};