import React from 'react';
import { Home, Calculator, User, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface ProgressBarProps {
    currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const steps: Step[] = [
        {
            icon: Home,
            title: 'Property Details',
            description: 'Price & Deposit'
        },
        {
            icon: Calculator,
            title: 'Loan Details',
            description: 'Term & Rate'
        },
        {
            icon: User,
            title: 'Your Information',
            description: 'Income & Expenses'
        },
        {
            icon: CheckCircle,
            title: 'Results',
            description: 'Your Estimate'
        }
    ];

    return (
        <div className="mb-8">
            {/* Step Icons */}
            <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div
                                className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                  ${isActive ? 'bg-blue-600 text-white shadow-lg scale-110' : ''}
                  ${isCompleted ? 'bg-green-600 text-white' : ''}
                  ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-400' : ''}
                `}
                            >
                                <StepIcon size={24} />
                            </div>

                            {/* Step title and description - hidden on mobile */}
                            <div className="text-center hidden md:block">
                                <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                                    {step.title}
                                </p>
                                <p className="text-xs text-gray-500">{step.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                    className="absolute h-2 bg-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;