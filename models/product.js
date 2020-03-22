'use strict';
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING(1000), allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      discounted_price: { type: DataTypes.DECIMAL, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      image_2: { type: DataTypes.STRING, allowNull: false },
      thumbnail: { type: DataTypes.STRING, allowNull: false },
      display: { type: DataTypes.INTEGER, allowNull: false }
    },
    { timestamps: false }
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  sequelizePaginate.paginate(Product);
  return Product;
};
