'use strict';
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
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      discounted_price: { type: DataTypes.DECIMAL, allowNull: false },
      image: { type: DataTypes.STRING, allowNull: false },
      image_2: { type: DataTypes.STRING, allowNull: false },
      thumbnail: { type: DataTypes.STRING, allowNull: false },
      display: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true
    }
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
