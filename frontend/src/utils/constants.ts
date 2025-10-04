// API Configuration
export const API_URL: string = 'http://localhost:3001/api';

// Form field configurations
export const MORTGAGE_TERM_MIN: number = 5;
export const MORTGAGE_TERM_MAX: number = 35;
export const MORTGAGE_TERM_DEFAULT: number = 25;

export const INTEREST_RATE_MIN: number = 0.1;
export const INTEREST_RATE_MAX: number = 15;
export const INTEREST_RATE_DEFAULT: number = 4.5;
export const INTEREST_RATE_STEP: number = 0.1;

// Validation limits
export const PROPERTY_PRICE_MIN: number = 10000;
export const PROPERTY_PRICE_MAX: number = 10000000;

export const ANNUAL_INCOME_MAX: number = 10000000;
export const MONTHLY_EXPENSES_MAX: number = 100000;

// Affordability threshold
export const AFFORDABILITY_THRESHOLD: number = 28;

// Storage
export const STORAGE_KEY: string = 'lloydsMortgageCalc';
export const STORAGE_EXPIRY_DAYS: number = 7;