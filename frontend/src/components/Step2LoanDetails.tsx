import React from 'react';
import Tooltip from './Tooltip';
import type { FormData } from '../types/calculator';
import {
    MORTGAGE_TERM_MIN,
    MORTGAGE_TERM_MAX,
    INTEREST_RATE_MIN,
    INTEREST_RATE_MAX,
    INTEREST_RATE_STEP
} from '../utils/constants';

interface Step2Props {
    formData: FormData;
    handleInputChange: (field: keyof FormData, value: string) => void;
}

const Step2LoanDetails: React.FC<Step2Props> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Loan Details
            </h2>

            {/* Mortgage Term Slider */}
            <div className="mb-8">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    Mortgage Term
                    <Tooltip
                        content="The length of time you'll take to repay the mortgage. Common terms are 25-30 years. Longer terms mean lower monthly payments but more interest overall."
                        id="mortgageTerm"
                    />
                </label>

                <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-blue-600">
                        {formData.mortgageTerm} years
                    </span>
                </div>

                <input
                    type="range"
                    min={MORTGAGE_TERM_MIN}
                    max={MORTGAGE_TERM_MAX}
                    value={formData.mortgageTerm}
                    onChange={(e) => handleInputChange('mortgageTerm', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{MORTGAGE_TERM_MIN} years</span>
                    <span>{MORTGAGE_TERM_MAX} years</span>
                </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="mb-8">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
                    Interest Rate
                    <Tooltip
                        content="The annual interest rate on your mortgage. This affects your monthly payment significantly. Current average rates are around 4-5%."
                        id="interestRate"
                    />
                </label>

                <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-blue-600">
                        {formData.interestRate}%
                    </span>
                </div>

                <input
                    type="range"
                    min={INTEREST_RATE_MIN}
                    max={INTEREST_RATE_MAX}
                    step={INTEREST_RATE_STEP}
                    value={formData.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{INTEREST_RATE_MIN}%</span>
                    <span>{INTEREST_RATE_MAX}%</span>
                </div>
            </div>

            {/* Info Tip */}
            <div className="info-box-green">
                <p className="text-sm">
                    💡 <strong>Tip:</strong> Even a 0.5% difference in interest rate can save thousands over the life of your mortgage!
                </p>
            </div>
        </div>
    );
};

export default Step2LoanDetails;