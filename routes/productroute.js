const express = require("express");
const { Product } = require("../models");
const router = express.Router();

// Thêm một sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json({
      action: "add",
      status: "success",
      Product: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      action: "add",
      status: "error",
      message: error.message,
    });
  }
});

// Lấy danh sách tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll();
    res.json({
      action: "view",
      status: "success",
      Products: allProducts,
    });
  } catch (error) {
    res.status(500).json({
      action: "view",
      status: "error",
      message: error.message,
    });
  }
});

// Lấy thông tin sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json({
        action: "view",
        status: "success",
        Product: product,
      });
    } else {
      res.status(404).json({
        action: "view",
        status: "error",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      action: "view",
      status: "error",
      message: error.message,
    });
  }
});

// Cập nhật thông tin sản phẩm
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { ProductId: req.params.id },
    });
    res.json({
      action: "update",
      status: "success",
      Product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({
      action: "update",
      status: "error",
      message: error.message,
    });
  }
});

// Xóa sản phẩm theo ID
router.delete("/:id", async (req, res) => {
  try {
    const deleteResult = await Product.destroy({
      where: { ProductId: req.params.id },
    });
    if (deleteResult) {
      res.json({
        action: "delete",
        status: "success",
        message: "Product deleted",
      });
    } else {
      res.status(404).json({
        action: "delete",
        status: "error",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      action: "delete",
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
