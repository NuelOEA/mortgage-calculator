import React from 'react';
import { CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import type { CalculationResult, FormData } from '../types/calculator';
import { formatCurrency, formatPercentage } from '../utils/formatters';

interface Step4Props {
    results: CalculationResult;
    formData: FormData;
    onStartOver: () => void;
}

const Step4Results: React.FC<Step4Props> = ({ results, formData, onStartOver }) => {
    const { affordability } = results;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Mortgage Estimate
            </h2>

            {/* Hero Section - Monthly Payment */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 shadow-xl mb-6">
                <p className="text-sm opacity-90 mb-2">Estimated Monthly Payment</p>
                <p className="text-5xl md:text-6xl font-bold mb-2">
                    {formatCurrency(results.monthlyPayment)}
                </p>
                <p className="text-sm opacity-90">
                    per month for {formData.mortgageTerm} years
                </p>
            </div>

            {/* Grid of 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {formatCurrency(results.loanAmount)}
                    </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {formatCurrency(results.totalInterest)}
                    </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Total Repayment</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {formatCurrency(results.totalRepayment)}
                    </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                    <p className="text-3xl font-bold text-gray-800">
                        {results.interestRate}%
                    </p>
                </div>
            </div>

            {/* Affordability Assessment */}
            <div className={`${affordability.isAffordable ? 'info-box-green' : 'info-box-red'} p-5`}>
                <div className="flex items-start">
                    {affordability.isAffordable ? (
                        <CheckCircle className="text-green-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    ) : (
                        <AlertCircle className="text-red-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    )}
                    <div>
                        <h3 className="font-bold text-lg mb-2">
                            {affordability.isAffordable ? 'This Looks Affordable!' : 'Affordability Concern'}
                        </h3>
                        <p className="mb-2">
                            Your monthly payment would be <strong>{formatPercentage(affordability.affordabilityRatio)}</strong> of
                            your monthly income ({formatCurrency(affordability.monthlyIncome)}).
                        </p>
                        <p className="text-sm">
                            {affordability.isAffordable ? (
                                <>
                                    This is within the recommended threshold of {affordability.threshold}%.
                                    This suggests the mortgage would be manageable based on your income.
                                </>
                            ) : (
                                <>
                                    This exceeds the recommended threshold of {affordability.threshold}%.
                                    You may want to consider a larger deposit, longer term, or lower property price to improve affordability.
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* What This Means Section */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">
                    What This Means For You
                </h3>
                <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span>
                            You'll pay <strong>{formatCurrency(results.monthlyPayment)}</strong> every month
                            for <strong>{formData.mortgageTerm} years</strong>
                        </span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span>
                            Over the full term, you'll pay <strong>{formatCurrency(results.totalInterest)}</strong> in
                            interest on top of your <strong>{formatCurrency(results.loanAmount)}</strong> loan
                        </span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span>
                            Your total repayment amount will be <strong>{formatCurrency(results.totalRepayment)}</strong>
                        </span>
                    </li>
                    <li className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-sm text-gray-600">
                            These figures are estimates based on a fixed interest rate of {results.interestRate}% for the entire term.
                            Actual rates and payments may vary.
                        </span>
                    </li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                    className="btn-primary flex-1 flex items-center justify-center"
                    onClick={() => alert('This would redirect to mortgage application page')}
                >
                    Apply for Mortgage
                    <ChevronRight size={20} className="ml-2" />
                </button>

                <button
                    className="btn-secondary flex-1"
                    onClick={onStartOver}
                >
                    Start Over
                </button>
            </div>
        </div>
    );
};

export default Step4Results;