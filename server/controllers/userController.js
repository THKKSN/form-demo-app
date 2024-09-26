const Evaluation = require('../models/Evaluation');
const getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate('evaluators', 'first_name last_name') 
      .populate('evaluation', 'first_name last_name'); 

    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching evaluations', error: error.message });
  }
};

module.exports = { getEvaluations};
