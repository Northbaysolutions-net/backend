"use strict";
module.exports = (sequelize, DataTypes) => {
  const attribute = sequelize.define(
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
    { timestamps: false, freezeTableName: true, tableName: "attribute" }
  );
  attribute.associate = function(models) {
    attribute.hasMany(models.attribute_value, { foreignKey: "attribute_id" }); //, { foreignKey: 'attribute_id', sourceKey: 'attribute_id' })
  };

  return attribute;
};
