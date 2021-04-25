const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        padId: {
            type: DataTypes.STRING,
            references: {
                model: "pads",
                key: "id"
            },
            onDelete: "cascade"
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "cascade"
        }
    });

    return Like;
}