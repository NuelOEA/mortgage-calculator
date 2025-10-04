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

    useEffect(() => {
        const savedData = loadCalculatorData();
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    const debouncedSave = useCallback(
        debounce((data: FormData) => {
            saveCalculatorData(data);
        }, 500),
        []
    );

    const handleInputChange = (field: keyof FormData, value: string) => {
        const newFormData = {
            ...formData,
            [field]: value
        };
        setFormData(newFormData);
        debouncedSave(newFormData);
        setError(null);
    };

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

    const nextStep = () => {
        setError(null);

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

    const handleCalculate = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await calculateMortgage(formData);
            setResults(response.data);
            setCurrentStep(3);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Calculation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto" style={{ maxWidth: '1200px' }}>
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6 shadow-lg">
                        <Home className="text-white" size={40} />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
                        Mortgage Calculator
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                        Get a clear picture of your mortgage in just a few steps
                    </p>
                    <div className="flex items-center justify-center mt-4 text-sm sm:text-base text-green-600">
                        <CheckCircle size={20} className="mr-2" />
                        <span>Your progress is automatically saved</span>
                    </div>
                </div>

                {/* Main Card - Full Width */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 w-full">
                    {/* Progress Bar */}
                    {currentStep < 3 && (
                        <div className="mb-12">
                            <ProgressBar currentStep={currentStep} />
                        </div>
                    )}

                    {/* Step Content - Constrained for readability */}
                    <div className="max-w-3xl mx-auto mb-10">
                        {renderStep()}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="info-box-red mb-8 max-w-3xl mx-auto">
                            <p className="font-medium">{error}</p>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {currentStep < 3 && (
                        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto pt-6 border-t border-gray-200">
                            {currentStep > 0 && (
                                <button
                                    onClick={prevStep}
                                    className="btn-secondary flex-1 text-lg py-4"
                                    disabled={loading}
                                >
                                    Back
                                </button>
                            )}

                            <button
                                onClick={nextStep}
                                className="btn-primary flex-1 text-lg py-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
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

function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export default MortgageCalculator;