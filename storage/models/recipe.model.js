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
                type: DataTypes.STRING,
                allowNull: false
            },
            ingredient: {
                type: DataTypes.STRING,
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