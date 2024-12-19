const sequelize = require("./config.js"); // Kết nối từ file config.js

// Kiểm tra kết nối
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
