/**
 * Computes the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 *
 * The GCD of two integers is the largest positive integer that divides both numbers without leaving a remainder.
 *
 * @param {number} a - The first number. Must be a non-negative integer.
 * @param {number} b - The second number. Must be a non-negative integer.
 * @returns {number} The greatest common divisor of the two numbers.
 * 
 * @complexity
 * Time complexity: O(log(min(a, b))) - The Euclidean algorithm runs in logarithmic time.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * This function uses the Euclidean algorithm to compute the greatest common divisor (GCD) of two non-negative integers.
 * The Euclidean algorithm is based on the principle that the GCD of two numbers also divides their difference.
 * The algorithm repeatedly replaces the larger number by its remainder when divided by the smaller number until one of the numbers becomes zero.
 * The non-zero number at this point is the GCD of the original two numbers.
 *
 * @example
 * // Compute the GCD of 48 and 18
 * const gcd: number = greatestCommonDivisor(48, 18);
 * console.log(gcd); // 6
 *
 * @example
 * // Compute the GCD of 101 and 103
 * const gcd: number = greatestCommonDivisor(101, 103);
 * console.log(gcd); // 1

 */
export default function greatestCommonDivisor(a: number, b: number): number {
    while (b !== 0) {
        let t: number = b;
        b = a % b;
        a = t;
    }
    return a;
}