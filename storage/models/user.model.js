const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            underscored: true
        });
};
