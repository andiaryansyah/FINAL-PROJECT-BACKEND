const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('auth',
        {
            id: {
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },      
        },
        {
            underscored: true
        });
};