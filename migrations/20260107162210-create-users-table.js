'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create enum for role_type
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_users_role_type" AS ENUM('customer', 'admin', 'public');
    `);

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      role_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'role_groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      role_type: {
        type: Sequelize.ENUM('customer', 'admin', 'public'),
        allowNull: false,
        defaultValue: 'customer'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      kyc_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      kyc_reject_message: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      kyc_reject_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_login_at: {
        type: Sequelize.DATE,
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
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Add indexes
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['role_group_id']);
    await queryInterface.addIndex('users', ['role_type']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_users_role_type";
    `);
  }
};
