const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return User;
}