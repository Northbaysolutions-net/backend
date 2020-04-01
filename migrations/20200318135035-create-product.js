'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product', {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      discounted_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0.00
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      image_2: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      display: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product');
  }
};