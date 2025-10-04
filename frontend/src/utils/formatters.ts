// Format number as currency (£)
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

// Format number with commas
export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-GB').format(value);
};

// Format percentage
export const formatPercentage = (value: number, decimals: number = 1): string => {
    return `${value.toFixed(decimals)}%`;
};