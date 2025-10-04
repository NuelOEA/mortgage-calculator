/**
 * Calculate monthly mortgage payment using the standard formula
 * Formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]
 * Where:
 * M = Monthly payment
 * P = Principal loan amount
 * r = Monthly interest rate (annual rate / 12 / 100)
 * n = Total number of payments (years × 12)
 */

exports.calculateMortgage = (data) => {
    const {
        propertyPrice,
        deposit,
        mortgageTerm,
        interestRate,
        annualIncome,
        monthlyExpenses
    } = data;

    // Step 1: Calculate loan amount
    const loanAmount = propertyPrice - deposit;

    // Step 2: Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;

    // Step 3: Calculate total number of monthly payments
    const numberOfPayments = mortgageTerm * 12;

    // Step 4: Calculate monthly payment
    let monthlyPayment;

    if (monthlyRate === 0) {
        // Special case: 0% interest rate
        monthlyPayment = loanAmount / numberOfPayments;
    } else {
        // Standard mortgage formula
        const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
        monthlyPayment = loanAmount * (numerator / denominator);
    }

    // Step 5: Calculate total repayment and interest
    const totalRepayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalRepayment - loanAmount;

    // Step 6: Calculate affordability
    const monthlyIncome = annualIncome / 12;
    const affordabilityRatio = (monthlyPayment / monthlyIncome) * 100;
    const affordabilityThreshold = 28; // Industry standard: 28% of income

    // Step 7: Round all values to 2 decimal places
    return {
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        loanAmount: Math.round(loanAmount * 100) / 100,
        totalRepayment: Math.round(totalRepayment * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        interestRate,
        mortgageTerm,
        affordability: {
            monthlyIncome: Math.round(monthlyIncome * 100) / 100,
            affordabilityRatio: Math.round(affordabilityRatio * 10) / 10,
            isAffordable: affordabilityRatio <= affordabilityThreshold,
            threshold: affordabilityThreshold
        }
    };
};