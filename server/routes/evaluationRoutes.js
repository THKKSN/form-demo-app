const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation')

router.get('/', async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    console.log('Evaluations:', evaluations); // Log to see the data
    res.status(200).json(evaluations);
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    res.status(500).json({ message: 'Failed to fetch evaluations' });
  }
});

module.exports = router;