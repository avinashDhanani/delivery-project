'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create enum for kyc_status
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_customer_profiles_kyc_status" AS ENUM('Pending', 'Approved', 'Rejected');
    `);

    await queryInterface.createTable('customer_profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      company_name: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      gst_no: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      zip_code: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      kyc_status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending'
      },
      credit_limit: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      wallet_balance: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      terms_agreed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      terms_agreed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ref_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ref_mobile: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('customer_profiles', ['user_id']);
    await queryInterface.addIndex('customer_profiles', ['kyc_status']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customer_profiles');
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_customer_profiles_kyc_status";
    `);
  }
};
