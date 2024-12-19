const express = require("express");
const axios = require("axios");
const UserFetchNew = require("../models/userFetchNew.model");
const router = express.Router();

// Endpoint: Lấy dữ liệu từ API và lưu vào cơ sở dữ liệu
router.get("/fetch-users-new", async (req, res) => {
  try {
    // Lấy dữ liệu người dùng từ API
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    const users = response.data;

    // Chuyển đổi dữ liệu để khớp với mô hình database
    const transformedUsers = users.map((user) => ({
      FullName: user.name,
      Username: user.username,
      Email: user.email,
      Phone: user.phone,
      Website: user.website,
      Street: user.address.street,
      Suite: user.address.suite,
      City: user.address.city,
      Zipcode: user.address.zipcode,
      Lat: user.address.geo.lat,
      Lng: user.address.geo.lng,
    }));

    // Lưu dữ liệu vào cơ sở dữ liệu với cơ chế cập nhật nếu trùng Email
    await UserFetchNew.bulkCreate(transformedUsers, {
      updateOnDuplicate: ["Email"],
    });

    // Phản hồi thành công
    res.json({
      status: "success",
      message: "New users fetched and saved successfully!",
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    // Phản hồi lỗi
    res.status(500).json({
      status: "error",
      message: "Failed to fetch users.",
    });
  }
});

module.exports = router;
