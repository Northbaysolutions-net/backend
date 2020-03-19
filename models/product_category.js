/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var product_category =  sequelize.define('product_category', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_category',
    timestamps: false
  });

  product_category.associate = function(models) {
    product_category.belongsTo(models.category, {foreignKey: 'category_id' });
    product_category.belongsTo(models.product, {foreignKey: 'product_id' });
  };

  return product_category;
};
