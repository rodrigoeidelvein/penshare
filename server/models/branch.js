'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      branch.belongsTo(models.user, { foreignKey: 'idUser', onDelete: "CASCADE" });
      branch.hasMany(models.revision, { foreignKey: 'idBranch', onDelete: "CASCADE" })
    }
  };
  branch.init({
    content: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: 'principal',
    },
    rawContent: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    head: {
      type: DataTypes.INTEGER,
      references: {
        model: 'revision',
        key: 'id'
      }
    },
    idPad: {
        type: DataTypes.STRING,
        references: {
            model: "pad",
            key: "id",
        },
    },
    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      }
    }
  }, {
    sequelize,
    modelName: 'branch',
  });
  return branch;
};