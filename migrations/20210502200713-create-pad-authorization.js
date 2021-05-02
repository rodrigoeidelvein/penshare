'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PadAuthorizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "id",
          as: "userId"
        }
      },
      padId: {
        type: Sequelize.STRING,
        references: {
          model: "Pads",
          id: "id",
          as: "padId"
        },
        onDelete: 'cascade'
      },
      sharedWith: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "id",
          as: "sharedWith"
        }
      },
      roleId: {
        type: Sequelize.STRING,
        references: {
          model: "Roles",
          key: "id",
          as: "roleId"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PadAuthorizations');
  }
};