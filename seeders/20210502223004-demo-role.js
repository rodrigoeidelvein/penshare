'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Roles', [
      {
        id: 'autor',
        read: true,
        write: true,
        delete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'editor',
        read: true,
        write: true,
        delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'leitor',
        read: true,
        write: false,
        delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
