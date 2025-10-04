const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculator.controller');
const { validateCalculation } = require('../middleware/validator');

// POST /api/calculator/calculate
// This route validates input, then calculates mortgage
router.post('/calculate', validateCalculation, calculatorController.calculate);

module.exports = router;