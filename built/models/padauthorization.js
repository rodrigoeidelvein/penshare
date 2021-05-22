'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PadAuthorization extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            PadAuthorization.belongsTo(models.User, {
                foreignKey: "userId"
            });
            PadAuthorization.belongsTo(models.Pad, {
                foreignKey: "padId",
                onDelete: "cascade",
            });
            PadAuthorization.belongsTo(models.Role, {
                foreignKey: "roleId",
                as: "role"
            });
        }
    }
    ;
    PadAuthorization.init({
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.STRING,
            references: {
                model: "Users",
                key: "id",
                as: "userId"
            }
        },
        sharedWith: {
            type: DataTypes.STRING,
            references: {
                model: "Users",
                key: "id",
                as: "sharedWith"
            }
        },
        roleId: {
            type: DataTypes.STRING,
            references: {
                model: "Roles",
                key: "id",
                as: "roleId"
            }
        }
    }, {
        sequelize,
        modelName: 'PadAuthorization',
    });
    return PadAuthorization;
};
