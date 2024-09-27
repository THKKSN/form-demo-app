const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ดึงข้อมูลการประเมินสำหรับผู้ใช้ทั่วไป (ดูข้อมูลตัวเอง)
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ user_id: req.user._id }); // ดึงเฉพาะข้อมูลของผู้ใช้
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ดึงข้อมูลการประเมินทั้งหมด (เฉพาะ Admin)
router.get("/users", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const evaluations = await Evaluation.find(); // ดึงข้อมูลทั้งหมดสำหรับ Admin
    res.status(200).json(evaluations);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
