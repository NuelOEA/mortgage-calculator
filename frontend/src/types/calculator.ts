// Form data structure
export interface FormData {
    propertyPrice: string;
    deposit: string;
    mortgageTerm: string;
    interestRate: string;
    annualIncome: string;
    monthlyExpenses: string;
}

// API request structure
export interface CalculationRequest {
    propertyPrice: number;
    deposit: number;
    mortgageTerm: number;
    interestRate: number;
    annualIncome: number;
    monthlyExpenses: number;
}

// Affordability information
export interface AffordabilityInfo {
    monthlyIncome: number;
    affordabilityRatio: number;
    isAffordable: boolean;
    threshold: number;
}

// Calculation result structure
export interface CalculationResult {
    monthlyPayment: number;
    loanAmount: number;
    totalRepayment: number;
    totalInterest: number;
    interestRate: number;
    mortgageTerm: number;
    affordability: AffordabilityInfo;
}

// API response structure
export interface CalculationResponse {
    success: boolean;
    data: CalculationResult;
    calculatedAt: string;
}

// Saved data structure
export interface SavedData {
    data: FormData;
    timestamp: number;
}