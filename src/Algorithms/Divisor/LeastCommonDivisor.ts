import greatestCommonDivisor from "./GreatestCommonDivisor";


/**
 * Computes the least common divisor (LCD) of two numbers.
 *
 * The LCD of two integers is the smallest positive integer that is divisible by both numbers.
 *
 * @param {number} a - The first number. Must be a non-negative integer.
 * @param {number} b - The second number. Must be a non-negative integer.
 * @returns {number} The least common divisor of the two numbers. Returns 0 if both inputs are 0.
 *
 * @complexity
 * Time complexity: O(log(min(a, b))) - The function relies on the Euclidean algorithm for GCD, which runs in logarithmic time.
 * Space complexity: O(1) - We use a constant amount of space.
 *
 * @description
 * This function computes the least common divisor (LCD) of two non-negative integers using the relationship between
 * the greatest common divisor (GCD) and the least common multiple (LCM). The LCD is the smallest positive integer
 * that is divisible by both numbers. It is computed using the formula:
 * 
 * LCD(a, b) = (|a| * |b|) / GCD(a, b)
 * 
 * where GCD(a, b) is the greatest common divisor of a and b. This formula ensures that the LCD is computed efficiently
 * by leveraging the Euclidean algorithm for GCD.
 *
 * @example
 * // Compute the LCD of 12 and 18
 * const lcd = leastCommonDivisor(12, 18);
 * console.log(lcd); // 36
 *
 * @example
 * // Compute the LCD of 7 and 5
 * const lcd = leastCommonDivisor(7, 5);
 * console.log(lcd); // 35
 */
export default function leastCommonDivisor(a: number, b: number): number {
    return (Math.abs(a) * Math.abs(b)) / greatestCommonDivisor(a, b);
}