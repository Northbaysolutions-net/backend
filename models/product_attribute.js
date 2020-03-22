'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define(
    'product_attribute',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'product_id'
        }
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'AttributeValues',
          key: 'attribute_id'
        }
      }
    },
    { timestamps: false }
  );
  ProductAttribute.associate = function(models) {
    // associations can be defined here
  };
  return ProductAttribute;
};
