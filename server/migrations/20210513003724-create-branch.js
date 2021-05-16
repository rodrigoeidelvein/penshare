'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Branches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            padId: {
                type: Sequelize.STRING,
                references: {
                    model: "Pads",
                    key: "id",
                    as: "padId",
                },
                onDelete: "cascade"
            },
            owner: {
                type: Sequelize.STRING,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "cascade"
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
        await queryInterface.dropTable('Branches');
    }
};