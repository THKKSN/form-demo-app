const express = require('express');
const router = express.Router();

const Evaluation = require('../models/Evaluation'); 

// Route to get evaluation by ID
router.get('/evaluations/:id', async (req, res) => {
  const { id } = req.params;  

  try {
    // Fetch the evaluation from the database using the id
    const evaluation = await Evaluation.findById(id);

    // If evaluation not found, return 404
    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    // Return the evaluation data
    res.json(evaluation);
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;