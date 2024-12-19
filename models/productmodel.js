const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Product = sequelize.define("Product", {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  ManufacturingDate: {
    type: DataTypes.DATE,
  },
});

module.exports = Product;
