'use strict';
let videos = require('../videos.json')
module.exports = {
  async up(queryInterface, Sequelize) {
    videos.forEach((el) => {
      el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Videos', videos)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Videos', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
