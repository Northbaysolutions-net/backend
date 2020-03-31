'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
    .changeColumn('order', 'price', {
      type: Sequelize.FLOAT(),
      allowNull: false,
      default : 0.0
    });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
    .changeColumn('order', 'price', {
      type: Sequelize.INTEGER()
    });
  }
};
