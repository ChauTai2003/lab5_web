const express = require("express");
const { ShoppingCart, User, Product } = require("../models");
const router = express.Router();

// Thêm mục mới vào giỏ hàng
router.post("/", async (req, res) => {
  try {
    const newCart = await ShoppingCart.create(req.body);
    res.json({
      action: "add",
      status: "success",
      ShoppingCart: newCart,
    });
  } catch (error) {
    res.status(400).json({
      action: "add",
      status: "error",
      message: error.message,
    });
  }
});

// Lấy toàn bộ mục trong giỏ hàng (kèm thông tin người dùng và sản phẩm)
router.get("/", async (req, res) => {
  try {
    const allCarts = await ShoppingCart.findAll({
      include: [User, Product],
    });
    res.json({
      action: "view",
      status: "success",
      ShoppingCarts: allCarts,
    });
  } catch (error) {
    res.status(500).json({
      action: "view",
      status: "error",
      message: error.message,
    });
  }
});

// Lấy giỏ hàng theo ID người dùng
router.get("/user/:id", async (req, res) => {
  try {
    const userCarts = await ShoppingCart.findAll({
      where: { UserId: req.params.id },
      include: [Product],
    });
    res.json({
      action: "view",
      status: "success",
      ShoppingCarts: userCarts,
    });
  } catch (error) {
    res.status(500).json({
      action: "view",
      status: "error",
      message: error.message,
    });
  }
});

// Cập nhật mục trong giỏ hàng theo ID giỏ hàng
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await ShoppingCart.update(req.body, {
      where: { CartId: req.params.id },
    });
    res.json({
      action: "update",
      status: "success",
      ShoppingCart: updatedCart,
    });
  } catch (error) {
    res.status(400).json({
      action: "update",
      status: "error",
      message: error.message,
    });
  }
});

// Xóa một mục khỏi giỏ hàng
router.delete("/:id", async (req, res) => {
  try {
    const deleteResult = await ShoppingCart.destroy({
      where: { CartId: req.params.id },
    });

    if (deleteResult) {
      res.json({
        action: "delete",
        status: "success",
        message: "Item removed from cart",
      });
    } else {
      res.status(404).json({
        action: "delete",
        status: "error",
        message: "Item not found",
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
