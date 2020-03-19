'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
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
          model: 'Departments',
          key: 'department_id'
        }
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.STRING(1000)
    },
    { timestamps: false }
  );
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};
