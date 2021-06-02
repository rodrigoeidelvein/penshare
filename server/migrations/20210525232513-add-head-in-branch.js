'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('branch', 'head',
                {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'revision',
                        key: 'id'
                    },
                    onDelete: 'CASCADE'
                })
        ])
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('branch', 'head')
        ])
    }
};
