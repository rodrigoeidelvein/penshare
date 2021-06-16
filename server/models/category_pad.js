'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class category_pad extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    category_pad.init({
        idPad: {
            allowNull: false,
            type: DataTypes.STRING,
            field: "id_pad",
            references: {
                model: "pad",
                key: "id"
            }
        },
        idCategory: {
            allowNull: false,
            field: "id_category",
            type: DataTypes.INTEGER,
            references: {
                model: "category",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'category_pad',
        timestamps: false
    });
    return category_pad;
};