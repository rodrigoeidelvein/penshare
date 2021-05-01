const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Role = sequelize.define("role", {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        read: {
            type: DataTypes.BOOLEAN
        },
        write: {
            type: DataTypes.BOOLEAN
        },
        delete: {
            type: DataTypes.BOOLEAN
        }
    });

    return Role;
}