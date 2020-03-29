'use strict';
const sequelizePaginate = require('sequelize-paginate');
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
    ProductAttribute.belongsTo(models.product, { foreignKey: 'product_id' });
    // associations can be defined here
  };
  sequelizePaginate.paginate(ProductAttribute);
  return ProductAttribute;
};
