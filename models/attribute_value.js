"use strict";
module.exports = (sequelize, DataTypes) => {
  const attribute_value = sequelize.define(
    "attribute_value",
    {
      attribute_value_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "attribute_value" }
  );
  attribute_value.associate = function(models) {
    attribute_value.belongsTo(models.attribute, { foreignKey: "attribute_id" });
    attribute_value.hasMany(models.product_attribute, {
      foreignKey: "attribute_value_id"
    });
  };
  return attribute_value;
};
