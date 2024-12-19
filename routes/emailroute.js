const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Tạo thư mục "uploads" nếu chưa tồn tại
const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Cấu hình Multer để upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Lưu file vào thư mục "uploads"
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

// **1. Endpoint: Upload Ảnh**
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "No file uploaded" });
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.json({
    status: "success",
    message: "Image uploaded successfully",
    filePath: filePath,
  });
});

// **2. Endpoint: Hiển Thị Ảnh**
router.get("/uploads/:filename", (req, res) => {
  const filePath = path.join(uploadDirectory, req.params.filename);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath); // Gửi file cho client
  } else {
    res.status(404).json({ status: "error", message: "Image not found" });
  }
});

// **3. Endpoint: Gửi Email**
router.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({
      status: "error",
      message: "Email, subject, and message are required.",
    });
  }

  try {
    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com", // Thay bằng email của bạn
        pass: "your-app-password", // Thay bằng mật khẩu ứng dụng
      },
    });

    // Tùy chọn email
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: subject,
      text: message,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    res.json({ status: "success", message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to send email.",
      error: error.message,
    });
  }
});

module.exports = router;
