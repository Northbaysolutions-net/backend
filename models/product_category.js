'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    'product_category',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'product_id'
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categorys',
          key: 'category_id'
        }
      }
    },
    { timestamps: false }
  );
  ProductCategory.associate = function(models) {
    ProductCategory.belongsTo(models.product, { foreignKey: 'product_id' });
    // associations can be defined here
  };
  sequelizePaginate.paginate(ProductCategory);
  return ProductCategory;
};
