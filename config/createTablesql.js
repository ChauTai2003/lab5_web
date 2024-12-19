const createTables = require("./createTablesql");

// Gọi hàm để tạo các bảng
createTables();

const express = require("express");
const sequelize = require("./config");
const createTables = require("./createTablesql");

const app = express();
app.use(express.json()); // Để parse JSON từ request body

// Khởi tạo cơ sở dữ liệu và bảng
createTables();

// Endpoint: Lấy tất cả người dùng
app.get("/users", async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM User");
    res.json({
      action: "view",
      status: "success",
      "User/Product/ShoppingCart": results,
    });
  } catch (err) {
    res.status(500).json({ action: "view", status: "error", error: err.message });
  }
});

// Endpoint: Thêm người dùng mới
app.post("/users", async (req, res) => {
  try {
    const { FullName, Address } = req.body;
    await sequelize.query(
      `INSERT INTO User (FullName, Address) VALUES (?, ?)`,
      { replacements: [FullName, Address] }
    );
    res.json({ action: "add", status: "success" });
  } catch (err) {
    res.status(500).json({ action: "add", status: "error", error: err.message });
  }
});

// Khởi động server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
