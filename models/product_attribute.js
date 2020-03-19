"use strict";
module.exports = (sequelize, DataTypes) => {
  const product_attribute = sequelize.define(
    "product_attribute",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "product_attribute" }
  );
  product_attribute.associate = function(models) {
    product_attribute.belongsTo(models.attribute_value, {
      foreignKey: "attribute_value_id"
    });
    product_attribute.belongsTo(models.product, { foreignKey: "product_id" });
    // associations can be defined here
  };
  return product_attribute;
};
