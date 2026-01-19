'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('otps', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      otp: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('registration', 'login', 'forgot_password'),
        allowNull: false
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      is_used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.addIndex('otps', ['email']);
    await queryInterface.addIndex('otps', ['email', 'type']);
    await queryInterface.addIndex('otps', ['expires_at']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('otps');
  }
};
