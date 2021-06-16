'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("category_pad", {
      id_pad: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "pad",
          id: "id"
        }
      },
      id_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id"
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("category_pad");
  }
};