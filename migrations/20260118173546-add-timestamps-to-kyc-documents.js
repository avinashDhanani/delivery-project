'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add timestamp columns to kyc_documents table
    await queryInterface.addColumn('kyc_documents', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });

    await queryInterface.addColumn('kyc_documents', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });

    await queryInterface.addColumn('kyc_documents', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove timestamp columns from kyc_documents table
    await queryInterface.removeColumn('kyc_documents', 'created_at');
    await queryInterface.removeColumn('kyc_documents', 'updated_at');
    await queryInterface.removeColumn('kyc_documents', 'deleted_at');
  }
};
