import { STORAGE_KEY, STORAGE_EXPIRY_DAYS } from '../utils/constants';
import type { FormData, SavedData } from '../types/calculator';

// Save calculator data to localStorage
export const saveCalculatorData = (data: FormData): boolean => {
    try {
        const savedData: SavedData = {
            data,
            timestamp: Date.now()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
};

// Load calculator data from localStorage
export const loadCalculatorData = (): FormData | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;

        const { data, timestamp }: SavedData = JSON.parse(saved);

        // Check if data is expired (7 days)
        const expiryTime = STORAGE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        if (Date.now() - timestamp > expiryTime) {
            clearCalculatorData();
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error loading data:', error);
        return null;
    }
};

// Clear saved calculator data
export const clearCalculatorData = (): boolean => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing data:', error);
        return false;
    }
};