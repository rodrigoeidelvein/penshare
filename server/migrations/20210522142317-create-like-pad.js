'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('like_pad', {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model:"user",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      id_pad: {
        type: Sequelize.STRING,
        references: {
          model: "pad",
          key: "id"
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
    await queryInterface.dropTable('like_pad');
  }
};