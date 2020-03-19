"use strict";
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    "customer",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
      },
      credit_card: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      address_1: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      address_2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      region: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      shipping_region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "1"
      },
      day_phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      eve_phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      mob_phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      }
    },
    { timestamps: false, freezeTableName: true, tableName: "customer" }
  );
  customer.associate = function(models) {
    customer.hasMany(models.order, { foreignKey: "customer_id" });
  };
  return customer;
};
