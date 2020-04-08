"use strict";
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "category",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "department_id"
        }
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING(1000)
    },
    { timestamps: false }
  );
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};
