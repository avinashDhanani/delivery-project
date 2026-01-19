'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('kyc_documents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      doc_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        comment: 'Aadhaar_Front, PAN, etc.'
      },
      file_path: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      uploaded_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('kyc_documents', ['user_id']);
    await queryInterface.addIndex('kyc_documents', ['doc_type']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('kyc_documents');
  }
};
