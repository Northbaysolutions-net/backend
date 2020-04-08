"use strict";
module.exports = (sequelize, DataTypes) => {
  const product_category = sequelize.define(
    "product_category",
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Products",
          key: "product_id"
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product_categories",
          key: "category_id"
        }
      }
    },
    { timestamps: false }
  );
  product_category.associate = function(models) {
    // associations can be defined here
  };
  return product_category;
};
