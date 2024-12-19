const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Tạo thư mục "uploads" nếu chưa tồn tại
const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Cấu hình Multer để lưu trữ ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Thư mục lưu trữ file
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Tạo tên file duy nhất
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}` // Định dạng tên file
    );
  },
});

const upload = multer({ storage });

// **Endpoint 1: Nhận và lưu ảnh**
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No file uploaded",
    });
  }

  const filePath = `/uploads/${req.file.filename}`;
  res.json({
    status: "success",
    message: "Image uploaded successfully",
    filePath: filePath,
  });
});

// **Endpoint 2: Hiển thị ảnh đã lưu**
router.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath); // Gửi file về phía client
  } else {
    res.status(404).json({
      status: "error",
      message: "Image not found",
    });
  }
});

module.exports = router;
