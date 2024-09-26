const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  evaluators: String,
  evaluation: String,
  quantity: Number,
  achievement: Number,
  reliability: Number,
  justinTime: Number,
  saving: Number,
  finallyscore: Number,
  qualityOfWork: Number,
  reliabilityOfWork: Number,
  timeliness: Number,
  personality: Number,
  maintaining: Number,
  communication: Number,
  relationship: Number,
  sacrifice: Number,
  cooperation: Number,
  conduct: Number,
  punctuality: Number,
  focused: Number,
  initiative: Number,
  knowledge: Number,
  sense: Number,
  development: Number,
  vision: Number
});

const Evaluation = mongoose.model('Evaluation', EvaluationSchema);

module.exports = Evaluation;
