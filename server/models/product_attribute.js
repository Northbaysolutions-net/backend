"use strict";
module.exports = (sequelize, DataTypes) => {
  const product_attribute = sequelize.define(
    "product_attribute",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "products",
          key: "product_id"
        }
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "attribute_values",
          key: "attribute_id"
        }
      }
    },
    { timestamps: false }
  );
  product_attribute.associate = function(models) {
    // associations can be defined here
  };
  return product_attribute;
};
