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
            User.hasMany(models.pad, {foreignKey: "idUser"});
            // User.hasMany(models.PadAuthorization, {foreignKey: "userId"});
            User.hasMany(models.like_pad, {foreignKey: "idUser"});
            User.hasMany(models.pad_suggestion, { foreignKey: "idContributor"});
            User.hasMany(models.pad_suggestion, { foreignKey: "idOwner"});
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
            field: "first_name"
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "full_name"
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idGoogle: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "id_google"
        },
        idOutlook: {
            type: DataTypes.STRING,
            allowNull: true,
            field: "id_outlook"
        },
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