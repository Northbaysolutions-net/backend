'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      order_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      total_price: DataTypes.DECIMAL
    },
    { timestamps: false }
  );
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
