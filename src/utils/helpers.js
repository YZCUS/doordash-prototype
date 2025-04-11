// Helper function to parse price string
export const parsePrice = (priceString) => {
    if (!priceString) return 0;
    // Remove all characters except digits and the decimal point
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
}; 