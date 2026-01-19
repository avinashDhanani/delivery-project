'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'otp_code', {
      type: Sequelize.STRING(10),
      allowNull: true
    });

    await queryInterface.addColumn('users', 'otp_expires_at', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('users', 'otp_type', {
      type: Sequelize.ENUM('registration', 'login', 'forgot_password'),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'otp_code');
    await queryInterface.removeColumn('users', 'otp_expires_at');
    await queryInterface.removeColumn('users', 'otp_type');
  }
};
