module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define(
    "product",
    {
      product_id: {
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
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      discounted_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: "0.00"
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      image_2: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NULL"
      },
      display: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0"
      }
    },
    {
      tableName: "product",
      timestamps: false,
    }
  );

  product.associate = function(models) {
    product.hasMany(models.product_attribute, {foreignKey: 'product_id' });
    product.hasMany(models.product_category , {foreignKey: 'product_id' });
  };

  return product;
};
