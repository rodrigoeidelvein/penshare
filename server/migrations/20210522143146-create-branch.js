'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('branch', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.TEXT,
      },
      content: {
        type: Sequelize.TEXT
      },
      raw_content: {
        type: Sequelize.TEXT
      },
      id_pad: {
        type: Sequelize.STRING,
        references: {
          model: 'pad',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: "CASCADE"
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
    await queryInterface.dropTable('branch');
  }
};