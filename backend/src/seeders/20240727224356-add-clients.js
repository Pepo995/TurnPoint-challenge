'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clients', [
      {
        name: 'John Doe',
        dob: new Date('1990-05-15'),
        mainLanguage: 'English',
        secondaryLanguage: 'Spanish',
        fundingSource: 'NDIS',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        dob: new Date('1985-09-30'),
        mainLanguage: 'English',
        secondaryLanguage: 'French',
        fundingSource: 'HCP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carlos Garcia',
        dob: new Date('1978-12-12'),
        mainLanguage: 'Spanish',
        secondaryLanguage: 'Portuguese',
        fundingSource: 'CHSP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria Lee',
        dob: new Date('1982-07-25'),
        mainLanguage: 'Mandarin',
        secondaryLanguage: 'English',
        fundingSource: 'DVA',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clients', null, {});
  }
};
