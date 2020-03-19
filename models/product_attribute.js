/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var product_attribute =  sequelize.define('product_attribute', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    attribute_value_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_attribute',
    timestamps: false
  });

  product_attribute.associate = function(models) {
    product_attribute.belongsTo(models.attribute_value, {foreignKey: 'attribute_value_id'});
    product_attribute.belongsTo(models.product, {foreignKey: 'product_id'});
    product_attribute.hasMany(models.product_attribute, {
      as : 'parent',
      foreignKey: 'product_id' 
    })
  };

  return product_attribute;
};
