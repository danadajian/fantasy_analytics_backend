export const sum = (...numbers) => {
    const result = numbers.reduce((a, b) => a + b, 0);
    return Number(result.toFixed(2));
};