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
            
        },
        {
            underscored: true
        });
};