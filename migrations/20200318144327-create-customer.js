'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('customer', {
      customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      credit_card: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      address_1: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      address_2: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      region: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      shipping_region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '1'
      },
      day_phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      eve_phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      },
      mob_phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'NULL'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('customer');
  }
};