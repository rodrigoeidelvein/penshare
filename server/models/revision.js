'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Revision extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Revision.belongsTo(models.Branch, {foreignKey: "branchId"})
    }
  };
  Revision.init({
    changeset: DataTypes.STRING,
    branchId: {
      type: DataTypes.NUMBER,
      references: {
        model: "Branches",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Revision',
  });
  return Revision;
};