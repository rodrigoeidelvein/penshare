'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Pads',
                'mainBranch',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Branches',
                        key: 'id'
                    },
                    onDelete: 'cascade'
                }
            )
        ])
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn("Pads", "main_branch")
        ])
    }
};
