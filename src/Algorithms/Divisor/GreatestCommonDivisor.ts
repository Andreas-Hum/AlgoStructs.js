/**
 * Computes the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 *
 * The GCD of two integers is the largest positive integer that divides both numbers without leaving a remainder.
 *
 * @param {number} a - The first number. Must be a non-negative integer.
 * @param {number} b - The second number. Must be a non-negative integer.
 * @returns {number} The greatest common divisor of the two numbers.
 *
 * @remarks
 * Time complexity: O(log(min(a, b))) - The Euclidean algorithm runs in logarithmic time.
 * Space complexity: O(1) - We use a constant amount of space.
 */
export default function greatestCommonDivisor(a: number, b: number): number {
    while (b !== 0) {
        let t: number = b;
        b = a % b;
        a = t;
    }
    return a;
}