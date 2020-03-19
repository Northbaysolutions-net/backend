"use strict";
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define(
    "product_attribute",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "product",
          key: "product_id"
        }
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "attribute_value",
          key: "attribute_value_id"
        }
      }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true
    }
  );
  ProductAttribute.associate = function(models) {
    // associations can be defined here
  };
  return ProductAttribute;
};
