const express = require('express');
const router = express.Router();
const { submitEvaluator } = require('../controllers/evaluatorController');


router.post('/', submitEvaluator);

module.exports = router;
