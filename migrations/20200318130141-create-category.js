'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('category', {
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'department',
          key: 'department_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }    
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('category');
  }
};