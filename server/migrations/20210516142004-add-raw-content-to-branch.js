'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Branches',
          'rawContent',
          {
            type: Sequelize.STRING
          }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Branches", "rawContent")
  }
};
