// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getEvaluators } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware'); // Middleware ที่ใช้ตรวจสอบโทเค็น

// เส้นทางสำหรับดึงรายชื่อผู้ถูกประเมิน ยกเว้นผู้ล็อกอิน
router.get('/evaluations', auth, getEvaluators);

module.exports = router;
