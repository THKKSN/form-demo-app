const Evaluation = require('../models/Evaluation');
const jwt = require('jsonwebtoken')

// ฟังก์ชันสำหรับบันทึกข้อมูลการประเมิน (POST)
const submitForm = async () => {
  const { selectedEvaluators, ...otherFormData } = req.body;
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token); 
  const userId = decodedToken?.id; 

  try {
    const newEvaluation = new Evaluation({
      evaluators: selectedEvaluators,
      evaluation: userId, 
      ...otherFormData
    });

    await newEvaluation.save();

    await Promise.all(selectedEvaluators.map(async (evaluatorId) => {
      await User.findByIdAndUpdate(otherFormData.userId, {
        $addToSet: { receivedEvaluations: evaluatorId }
      });
    }));

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving evaluation', error });
  }
};


// ฟังก์ชันสำหรับดึงข้อมูลการประเมิน (GET)
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
  
  module.exports = { getEvaluations, submitForm };
