/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var attribute = sequelize.define(
    "attribute",
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "attribute",
      timestamps: false,
    }
  );

  attribute.associate = function(models) {
    attribute.hasMany(models.attribute_value, {foreignKey: 'attribute_id'}) //, { foreignKey: 'attribute_id', sourceKey: 'attribute_id' })
  };

  return attribute;
};
