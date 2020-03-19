'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define(
    'attribute',
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: { type: DataTypes.STRING, allowNull: false }
    },
    { timestamps: false }
  );
  Attribute.associate = function(models) {
    // associations can be defined here
  };
  return Attribute;
};
