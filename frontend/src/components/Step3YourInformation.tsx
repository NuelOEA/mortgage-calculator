import React from 'react';
import InputField from './InputField';
import type { FormData } from '../types/calculator';

interface Step3Props {
    formData: FormData;
    handleInputChange: (field: keyof FormData, value: string) => void;
}

const Step3YourInformation: React.FC<Step3Props> = ({ formData, handleInputChange }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your Information
            </h2>

            <InputField
                label="Annual Gross Income"
                type="number"
                value={formData.annualIncome}
                onChange={(value) => handleInputChange('annualIncome', value)}
                placeholder="e.g., 45000"
                tooltip="Your total yearly income before tax and deductions. Lenders use this to assess how much you can afford to borrow."
                tooltipId="annualIncome"
                min={0}
                max={10000000}
            />

            <InputField
                label="Monthly Expenses"
                type="number"
                value={formData.monthlyExpenses}
                onChange={(value) => handleInputChange('monthlyExpenses', value)}
                placeholder="e.g., 1500"
                tooltip="Your regular monthly outgoings including bills, food, transport, and other commitments. This helps determine affordability."
                tooltipId="monthlyExpenses"
                min={0}
                max={100000}
            />

            <div className="info-box-blue mt-6">
                <p className="text-sm">
                    <strong>Note:</strong> This information helps us assess whether the mortgage is affordable based on your financial situation.
                </p>
            </div>
        </div>
    );
};

export default Step3YourInformation;