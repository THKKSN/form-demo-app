const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation'); 

router.get('/evaluations/:id', async (req, res) => {
  const { id } = req.params;  

  try {
    const evaluation = await Evaluation.findById(id);


    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluation not found' });
    }

    res.json(evaluation);
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;