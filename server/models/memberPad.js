'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MemberPad extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MemberPad.belongsTo(models.pad, { foreignKey: "idPad" });
            MemberPad.belongsTo(models.user, { foreignKey: "idUser"});
        }
    };
    MemberPad.init({
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        idPad: {
            type: DataTypes.STRING,
            field: "id_pad",
            references: {
                model: "pad",
                key: "id",
            }
        },
        idUser: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            }
        },
        idPadRole: {
            type: DataTypes.INTEGER,
            references: {
                model: "pad_role",
                key: "id",
            }
        }
    }, {
        sequelize,
        modelName: "member_pad",
    });
    return MemberPad;
};