'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        static associate(models) {
            Like.belongsTo(models.User, {foreignKey: "userId", onDelete: "cascade"});
            Like.belongsTo(models.Pad, {foreignKey: "padId", onDelete: "cascade"});
        }
    };
    Like.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        padId: {
            type: DataTypes.STRING,
            references: {
                model: "Pads",
                key: "id",
                as: "padId"
            }
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: "Users",
                key: "id",
                as: "userId"
            }
        },
    }, {
        sequelize,
        modelName: 'Like',
    });
    return Like;
};