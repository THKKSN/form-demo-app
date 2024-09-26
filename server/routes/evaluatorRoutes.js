const express = require('express');
const router = express.Router();
const { submitEvaluator } = require('../controllers/evaluatorController');

// เส้นทางสำหรับ POST การเลือก evaluator
router.post('/', submitEvaluator);

module.exports = router;
