// routes/evaluationRoutes.js
const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');
const auth = require('../middleware/authMiddleware');

// Get all evaluations
router.get('/', auth, async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching evaluations" });
  }
});

// Add other routes like POST /evaluations here

module.exports = router;
