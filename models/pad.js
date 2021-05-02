'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Pad extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Pad.belongsTo(models.User, {
                foreignKey: "userId",
                as: "author"
            });

            Pad.hasMany(models.PadAuthorization, {foreignKey: "padId"});
        }
    };
    Pad.init({
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        rawContent: {
            type: DataTypes.TEXT,
            defaultValue: null
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["PUBLIC", "PRIVATE"]]
            },
            defaultValue: "PUBLIC",
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: "Users",
                key: "id",
                as: 'userId'
            }
        }
    }, {
        sequelize,
        modelName: "Pad",
    });
    return Pad;
};