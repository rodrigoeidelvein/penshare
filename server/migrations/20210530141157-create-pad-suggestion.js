'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pad_suggestion", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      raw_content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      change_set: {
        type: Sequelize.TEXT
      },
      id_pad: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "pad",
          key: "id"
        }
      },
      id_contributor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
        }
      },
      status: {
        type: Sequelize.ENUM("APPROVED", "REFUSED", "PENDING"),
        default: false
      },
      approved_at: {
        type: Sequelize.DATE
      },
      read: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      read_at: {
        type: Sequelize.DATE,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pad_suggestion");
  }
};