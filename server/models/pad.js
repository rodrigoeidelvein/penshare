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
            Pad.belongsTo(models.user, { foreignKey: "idUser"});

            // PadPage.hasMany(models.PadAuthorization, {foreignKey: "padId"});
            Pad.hasMany(models.like_pad, { foreignKey: "idPad"});
            Pad.hasMany(models.pad_suggestion, { foreignKey: "idPad"});
        }
    };
    Pad.init({
        id: {
            primaryKey: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        content: {
            type: DataTypes.TEXT
        },
        rawContent: {
            type: DataTypes.TEXT,
            field: 'raw_content'
        },
        type: {
            type: DataTypes.STRING,
            validate: {
                isIn: [["PUBLIC", "PRIVATE"]]
            },
            defaultValue: "PUBLIC",
            allowNull: false
        },
        idUser: {
            type: DataTypes.STRING,
            field: 'id_user',
            references: {
                model: "user",
                key: "id",
            }
        }
    }, {
        sequelize,
        modelName: "pad",
    });
    return Pad;
};