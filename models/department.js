/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var department = sequelize.define(
    "department",
    {
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      }
    },
    {
      tableName: "department",
      timestamps: false
    }
  );

  department.associate = function(models) {
    department.hasMany(models.category, {foreignKey: 'department_id'}); 
  };

  return department;
};
