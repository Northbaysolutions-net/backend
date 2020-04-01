'use strict';
module.exports = (sequelize, DataTypes) => {
  const product_order = sequelize.define(
    'product_order',
    {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity : {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false
    }
  }, { timestamps: false, freezeTableName: true, tableName: 'product_order' });
  product_order.associate = function(models) {
    // associations can be defined here
    product_order.belongsTo(models.order, { foreignKey: 'order_id' });
    product_order.belongsTo(models.product, { foreignKey: 'product_id' });
  };
  return product_order;
};