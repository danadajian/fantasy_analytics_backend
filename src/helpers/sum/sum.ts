export const sum = (...numbers: number[]): number => {
    const result = numbers.reduce((a, b) => a + b, 0);
    return Number(result.toFixed(2));
};