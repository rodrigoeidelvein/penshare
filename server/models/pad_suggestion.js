'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PadSuggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PadSuggestion.belongsTo(models.user, {  foreignKey: "idContributor"})
      PadSuggestion.belongsTo(models.pad, { foreignKey: "idPad" });
    }
  };
  PadSuggestion.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rawContent: {
      type: DataTypes.TEXT,
      field: "raw_content",
      allowNull: false
    },
    changeSet: {
      type: DataTypes.TEXT,
      field: "change_set"
    },
    idPad: {
      type: DataTypes.STRING,
      field: "id_pad",
      allowNull: false
    },
    idContributor: {
      type: DataTypes.INTEGER,
      field: "id_contributor",
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("APPROVED", "REFUSED", "PENDING"),
      defaultValue: "PENDING"
    },
    approved_at: {
      type: DataTypes.DATE
    },
    read: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    read_at: {
      type: DataTypes.DATE
    },
    comment: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'pad_suggestion',
  });
  return PadSuggestion;
};