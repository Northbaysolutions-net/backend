'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_category', {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product',
          key: 'product_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'category',
          key: 'category_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('product_category');
  }
};