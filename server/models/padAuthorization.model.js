const { DataTypes } = require('sequelize');

module.exports = (sequelize, User, Role) => {
    const PadAuthorization = sequelize.define("padAuthorization", {
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        sharedWith: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: 'id'
            }
        }
    });

    return PadAuthorization;
}