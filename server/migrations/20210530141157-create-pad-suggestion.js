'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pad_suggestions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT,
      },
      raw_content: {
        type: Sequelize.TEXT
      },
      change_set: {
        type: Sequelize.TEXT
      },
      id_pad: {
        type: Sequelize.STRING,
        references: {
          model: "pad",
          key: "id"
        }
      },
      id_contributor: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id"
        }
      },
      id_owner: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("pad_suggestions");
  }
};