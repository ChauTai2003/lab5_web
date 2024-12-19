const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const ShoppingCart = sequelize.define("ShoppingCart", {
  CartId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Quantity: { type: DataTypes.INTEGER },
});

module.exports = ShoppingCart;
