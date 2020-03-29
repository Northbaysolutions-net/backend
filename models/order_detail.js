'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
    'order_detail',
    {
      order_detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Order',
          key: 'order_id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'product_id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { timestamps: false }
  );
  OrderDetail.associate = function(models) {
    // associations can be defined here
  };
  return OrderDetail;
};
