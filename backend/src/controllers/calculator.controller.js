const mortgageService = require('../services/mortgageCalculation.service');

// Handle calculation requests
exports.calculate = async (req, res, next) => {
    try {
        // Call the calculation service
        const result = mortgageService.calculateMortgage(req.body);

        // Send successful response
        res.status(200).json({
            success: true,
            data: result,
            calculatedAt: new Date().toISOString()
        });
    } catch (error) {
        // Pass errors to error handler
        next(error);
    }
};