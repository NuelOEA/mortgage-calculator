import React from 'react';
import Tooltip from './Tooltip';

interface InputFieldProps {
    label: string;
    type: 'text' | 'number';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    tooltip?: string;
    tooltipId?: string;
    error?: string;
    min?: number;
    max?: number;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    tooltip,
    tooltipId,
    error,
    min,
    max
}) => {
    return (
        <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                {label}
                {tooltip && tooltipId && (
                    <Tooltip content={tooltip} id={tooltipId} />
                )}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                min={min}
                max={max}
                className={`input-field ${error ? 'border-red-500' : ''}`}
            />

            {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default InputField;