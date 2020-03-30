"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: DataTypes.INTEGER,
      order_data: DataTypes.DATE,
      total_price: DataTypes.FLOAT
    },
    {tableName: "order",
    timestamps: false,}
  );
  order.associate = function(models) {
    // associations can be defined here
  };
  sequelize.sync();
  return order;
};
