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
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            instructions: {
                type: DataTypes.STRING(2500),
                allowNull: false
            },
            ingredients: {
                type: DataTypes.STRING(1000),
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            
        },
        {
            underscored: true
        });
};