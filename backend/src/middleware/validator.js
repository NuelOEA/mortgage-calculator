const Joi = require('joi');

// Define validation schema for mortgage calculation
const calculationSchema = Joi.object({
    propertyPrice: Joi.number()
        .min(10000)
        .max(10000000)
        .required()
        .messages({
            'number.min': 'Property price must be at least £10,000',
            'number.max': 'Property price cannot exceed £10,000,000',
            'any.required': 'Property price is required'
        }),

    deposit: Joi.number()
        .min(0)
        .max(Joi.ref('propertyPrice'))
        .required()
        .messages({
            'number.max': 'Deposit cannot exceed property price',
            'any.required': 'Deposit is required'
        }),

    mortgageTerm: Joi.number()
        .integer()
        .min(5)
        .max(35)
        .required()
        .messages({
            'number.min': 'Mortgage term must be at least 5 years',
            'number.max': 'Mortgage term cannot exceed 35 years'
        }),

    interestRate: Joi.number()
        .min(0.1)
        .max(15)
        .required()
        .messages({
            'number.min': 'Interest rate must be at least 0.1%',
            'number.max': 'Interest rate cannot exceed 15%'
        }),

    annualIncome: Joi.number()
        .min(0)
        .max(10000000)
        .required()
        .messages({
            'any.required': 'Annual income is required'
        }),

    monthlyExpenses: Joi.number()
        .min(0)
        .max(100000)
        .required()
        .messages({
            'any.required': 'Monthly expenses are required'
        })
});

// Validation middleware function
exports.validateCalculation = (req, res, next) => {
    const { error, value } = calculationSchema.validate(req.body, {
        abortEarly: false // Check all fields, not just the first error
    });

    if (error) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Validation failed',
                details: error.details.map(detail => ({
                    field: detail.path[0],
                    message: detail.message
                }))
            }
        });
    }

    req.body = value; // Use validated values
    next(); // Continue to controller
};