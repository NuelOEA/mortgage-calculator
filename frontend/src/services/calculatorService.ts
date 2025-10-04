import axios, { AxiosError } from 'axios';
import { API_URL } from '../utils/constants';
import type { FormData, CalculationResponse } from '../types/calculator';

// Calculate mortgage via backend API
export const calculateMortgage = async (data: FormData): Promise<CalculationResponse> => {
    try {
        const response = await axios.post<CalculationResponse>(
            `${API_URL}/calculator/calculate`,
            {
                propertyPrice: parseFloat(data.propertyPrice),
                deposit: parseFloat(data.deposit),
                mortgageTerm: parseInt(data.mortgageTerm),
                interestRate: parseFloat(data.interestRate),
                annualIncome: parseFloat(data.annualIncome),
                monthlyExpenses: parseFloat(data.monthlyExpenses)
            },
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 10000
            }
        );

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ error?: { message?: string } }>;

        if (axiosError.response) {
            throw new Error(axiosError.response.data.error?.message || 'Calculation failed');
        } else if (axiosError.request) {
            throw new Error('Unable to connect to server. Please check if backend is running.');
        } else {
            throw new Error('An error occurred. Please try again.');
        }
    }
};