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
            references: {
                model: "pad",
                key: "id"
            }
        },
        idCategory: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: "pad",
                key: "id"
            }
        }
    }, {
        sequelize,
        modelName: 'category_pad',
    });
    return category_pad;
};