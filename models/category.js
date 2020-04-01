/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var category =   sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'NULL'
    }
  }, {
    tableName: 'category',
    timestamps: false
  });

  category.associate = function(models) {
    category.belongsTo(models.department, {foreignKey: 'department_id'} );
    category.hasMany(models.product_category, {foreignKey: 'category_id'});
  };

  return category;

};
