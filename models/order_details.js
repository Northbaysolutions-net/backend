'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_details = sequelize.define('order_details', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {});
  order_details.associate = function(models) {
    // associations can be defined here
  };
  return order_details;
};