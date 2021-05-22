'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Pad, {foreignKey: "userId"});
            User.hasMany(models.PadAuthorization, {foreignKey: "userId"});
            User.hasMany(models.Like, {foreignKey: "userId"});
        }
    };
    User.init({
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        },
        idGoogle: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idOutlook: {
            type: DataTypes.STRING,
            allowNull: true
        }
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'user',
    });
    return User;
};