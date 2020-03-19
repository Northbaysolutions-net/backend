'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'customer_id'
        }
      },
      order_date: { type: DataTypes.DATE, allowNull: false },
      total_price: { type: DataTypes.DECIMAL, allowNull: false }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true
    }
  );
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};
