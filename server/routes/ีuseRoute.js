const express = require('express');
const router = express.Router();
const { getEvaluators } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/evaluations', auth, getEvaluators);

module.exports = router;
