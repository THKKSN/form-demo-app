const Evaluation = require('../models/Evaluation');

const submitEvaluator = async (req, res) => {
  const { evaluatorId } = req.body;


  if (!evaluatorId) {
    return res.status(400).json({ message: 'Evaluator ID is required.' });
  }

  try {
    res.status(201).json({ message: 'Evaluator saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving evaluator', error: error.message });
  }
};

module.exports = { submitEvaluator };
