import React, { useState, useEffect, useCallback } from 'react';
import { Home, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import Step1PropertyDetails from './Step1PropertyDetails';
import Step2LoanDetails from './Step2LoanDetails';
import Step3YourInformation from './Step3YourInformation';
import Step4Results from './Step4Results';
import { calculateMortgage } from '../services/calculatorService';
import { saveCalculatorData, loadCalculatorData, clearCalculatorData } from '../services/storageService';
import type { FormData, CalculationResult } from '../types/calculator';
import {
    MORTGAGE_TERM_DEFAULT,
    INTEREST_RATE_DEFAULT,
    PROPERTY_PRICE_MIN,
    PROPERTY_PRICE_MAX
} from '../utils/constants';

const MortgageCalculator: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({
        propertyPrice: '',
        deposit: '',
        mortgageTerm: MORTGAGE_TERM_DEFAULT.toString(),
        interestRate: INTEREST_RATE_DEFAULT.toString(),
        annualIncome: '',
        monthlyExpenses: ''
    });
    const [results, setResults] = useState<CalculationResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Load saved data on mount
    useEffect(() => {
        const savedData = loadCalculatorData();
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    // Auto-save with debounce
    const debouncedSave = useCallback(
        debounce((data: FormData) => {
            saveCalculatorData(data);
        }, 500),
        []
    );

    // Handle input changes
    const handleInputChange = (field: keyof FormData, value: string) => {
        const newFormData = {
            ...formData,
            [field]: value
        };
        setFormData(newFormData);
        debouncedSave(newFormData);
        setError(null);
    };

    // Validation functions
    const isStep1Valid = (): boolean => {
        const price = parseFloat(formData.propertyPrice);
        const deposit = parseFloat(formData.deposit);

        if (!formData.propertyPrice || !formData.deposit) return false;
        if (price < PROPERTY_PRICE_MIN || price > PROPERTY_PRICE_MAX) return false;
        if (deposit < 0 || deposit > price) return false;

        return true;
    };

    const isStep2Valid = (): boolean => {
        return !!(formData.mortgageTerm && formData.interestRate);
    };

    const isStep3Valid = (): boolean => {
        const income = parseFloat(formData.annualIncome);
        const expenses = parseFloat(formData.monthlyExpenses);

        if (!formData.annualIncome || !formData.monthlyExpenses) return false;
        if (income <= 0 || expenses < 0) return false;

        return true;
    };

    // Navigation
    const nextStep = () => {
        setError(null);

        // Validate current step
        if (currentStep === 0 && !isStep1Valid()) {
            setError('Please enter valid property price and deposit.');
            return;
        }
        if (currentStep === 1 && !isStep2Valid()) {
            setError('Please select mortgage term and interest rate.');
            return;
        }
        if (currentStep === 2 && !isStep3Valid()) {
            setError('Please enter valid income and expenses.');
            return;
        }

        // If on step 2 (last step before results), calculate
        if (currentStep === 2) {
            handleCalculate();
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        setError(null);
        setCurrentStep(currentStep - 1);
    };

    // Calculate mortgage
    const handleCalculate = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await calculateMortgage(formData);
            setResults(response.data);
            setCurrentStep(3); // Move to results step
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Calculation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Start over
    const handleStartOver = () => {
        setFormData({
            propertyPrice: '',
            deposit: '',
            mortgageTerm: MORTGAGE_TERM_DEFAULT.toString(),
            interestRate: INTEREST_RATE_DEFAULT.toString(),
            annualIncome: '',
            monthlyExpenses: ''
        });
        setResults(null);
        setCurrentStep(0);
        setError(null);
        clearCalculatorData();
    };

    // Render current step
    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <Step1PropertyDetails
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 1:
                return (
                    <Step2LoanDetails
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 2:
                return (
                    <Step3YourInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 3:
                return results ? (
                    <Step4Results
                        results={results}
                        formData={formData}
                        onStartOver={handleStartOver}
                    />
                ) : null;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
                        <Home className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Mortgage Calculator
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Get a clear picture of your mortgage in just a few steps
                    </p>
                    <div className="flex items-center justify-center mt-3 text-sm text-green-600">
                        <CheckCircle size={16} className="mr-1" />
                        <span>Your progress is automatically saved</span>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
                    {/* Progress Bar - only show if not on results */}
                    {currentStep < 3 && (
                        <ProgressBar currentStep={currentStep} />
                    )}

                    {/* Step Content */}
                    <div className="mb-6">
                        {renderStep()}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="info-box-red mb-6">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    {/* Navigation Buttons - only show if not on results */}
                    {currentStep < 3 && (
                        <div className="flex flex-col sm:flex-row gap-4">
                            {currentStep > 0 && (
                                <button
                                    onClick={prevStep}
                                    className="btn-secondary flex-1"
                                    disabled={loading}
                                >
                                    Back
                                </button>
                            )}

                            <button
                                onClick={nextStep}
                                className="btn-primary flex-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Calculating...
                                    </span>
                                ) : (
                                    currentStep === 2 ? 'Calculate' : 'Next'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Debounce utility function
// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;  // ✅ Fixed!
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export default MortgageCalculator;