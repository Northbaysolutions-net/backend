'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define(
    'attribute_value',
    {
      attribute_value_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Attributes',
          key: 'attribute_id'
        }
      },
      value: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: false }
  );
  AttributeValue.associate = function(models) {
    // associations can be defined here
    AttributeValue.belongsTo(models.attribute, { foreignKey: 'attribute_id' });
  };
  return AttributeValue;
};
