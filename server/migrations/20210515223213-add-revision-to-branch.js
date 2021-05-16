'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                "Branches",
                "head",
                {
                    type: Sequelize.INTEGER,
                }
            )
        ])
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn("Branches", "head")
        ])
    }
};
