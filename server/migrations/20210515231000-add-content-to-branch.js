'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
            'Branches',
            'content',
            {
              type: Sequelize.STRING
            }
        )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Branches", "content")
    ])
  }
};
