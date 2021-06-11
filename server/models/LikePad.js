'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LikePad extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            LikePad.belongsTo(models.user, {foreignKey: "idUser", onDelete: "cascade"});
            LikePad.belongsTo(models.pad, {foreignKey: "idPad", onDelete: "cascade"});
        }
    }
    LikePad.init({
        idUser: {
            primaryKey: true,
            type: DataTypes.STRING,
            field: "id_user",
            references: {
                model: "user",
                key: "id",
            }
        },
        idPad: {
            type: DataTypes.STRING,
            field: "id_pad",
            references: {
                model: "pad",
                key: "id",
            }
        },
    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'like_pad',
    });
    return LikePad;
};