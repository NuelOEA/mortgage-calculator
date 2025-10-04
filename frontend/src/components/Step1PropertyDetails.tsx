import React from 'react';
import InputField from './InputField';
import type { FormData } from '../types/calculator';
import { formatNumber } from '../utils/formatters';

interface Step1Props {
    formData: FormData;
    handleInputChange: (field: keyof FormData, value: string) => void;
}

const Step1PropertyDetails: React.FC<Step1Props> = ({ formData, handleInputChange }) => {
    const loanAmount = (parseFloat(formData.propertyPrice || '0') - parseFloat(formData.deposit || '0'));

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Property Details
            </h2>

            <InputField
                label="Property Price"
                type="number"
                value={formData.propertyPrice}
                onChange={(value) => handleInputChange('propertyPrice', value)}
                placeholder="e.g., 250000"
                tooltip="The total purchase price of the property you wish to buy."
                tooltipId="propertyPrice"
                min={10000}
                max={10000000}
            />

            <InputField
                label="Deposit Amount"
                type="number"
                value={formData.deposit}
                onChange={(value) => handleInputChange('deposit', value)}
                placeholder="e.g., 50000"
                tooltip="The amount you'll pay upfront. A larger deposit typically means better interest rates. Most lenders require at least 5-10%."
                tooltipId="deposit"
                min={0}
            />

            {/* Loan Amount Display */}
            {formData.propertyPrice && formData.deposit && loanAmount >= 0 && (
                <div className="info-box-blue">
                    <p className="font-medium">
                        <strong>Loan Amount:</strong> £{formatNumber(loanAmount)}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Step1PropertyDetails;