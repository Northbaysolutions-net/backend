'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    'department',
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: false }
  );
  Department.associate = function(models) {
    // associations can be defined here
  };
  return Department;
};
