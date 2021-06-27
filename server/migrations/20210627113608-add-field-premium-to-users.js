'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
            "user",
            "premium",
            {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: true
            }
        )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.removeColumn("user", "premium"),
    ])
  }
};
