'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        static associate(models) {
            Branch.belongsTo(models.User, {foreignKey: "owner", onDelete: "cascade"});
            Branch.belongsTo(models.Pad, {foreignKey: "padId", onDelete: "cascade"});
            Branch.hasMany(models.Revision, {foreignKey: "branchId"});
        }
    };
    Branch.init({
        name: DataTypes.STRING,
        head: {
            type: DataTypes.NUMBER,
            references: {
                model: "Revisions",
                key: "id"
            }
        },
        padId: {
            type: DataTypes.STRING,
            references: {
                model: "Pads",
                key: "id",
                as: "padId"
            }
        },
        owner: {
            type: DataTypes.STRING,
            references: {
                model: "Users",
                key: "id",
                as: "owner"
            }
        }
    }, {
        sequelize,
        modelName: 'Branch',
    });
    return Branch;
};