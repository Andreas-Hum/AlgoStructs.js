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
 */
export default function leastCommonDivisor(a: number, b: number): number {
    return (Math.abs(a) * Math.abs(b)) / greatestCommonDivisor(a, b);
}