'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class revision extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            revision.belongsTo(models.branch, {
                foreignKey: "idBranch", onDelete: "CASCADE"
            })
            revision.belongsTo(models.user, {
                foreignKey: "idUser", onDelete: "CASCADE"
            })
        }
    };
    revision.init({
        changeset: {
            type: DataTypes.STRING,
            default: ''
        },
        idBranch: {
            type: DataTypes.STRING,
            references: {
                model: 'branch',
                key: 'id',
            },
        },
        idUser: {
            type: DataTypes.INTEGER,
            field: 'id_user',
            references: {
                model: 'user',
                key: 'id',
            }
        }
    }, {
        sequelize,
        modelName: 'revision',
    });
    return revision;
};