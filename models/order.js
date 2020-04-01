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
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      placed_on: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "order" }
  );
  order.associate = function(models) {
    order.belongsTo(models.customer, { foreignKey: "customer_id" });
    order.hasMany(models.product_order, { foreignKey: "order_id" });
  };
  return order;
};
