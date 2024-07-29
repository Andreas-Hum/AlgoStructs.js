/**
 * Computes the nth Fibonacci number using tabulation.
 *
 * The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1. This function returns the nth number in the Fibonacci sequence.
 *
 * @param {number} n - The position in the Fibonacci sequence to compute. Must be a non-negative integer.
 * @returns {number} The nth Fibonacci number. Returns -1 if the input is a negative number.
 *
 * @complexity
 * Time complexity: O(n) - We compute each Fibonacci number from 0 to n once.
 * Space complexity: O(n) - We store the Fibonacci sequence up to the nth number.
 */
export default function fibonacci(n: number): number {
    if (n < 0) return -1;

    const fibonacci: number[] = [0];

    if (n >= 1) {
        fibonacci.push(1);
    }

    for (let i: number = 2; i <= n; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }

    return fibonacci[n];
}
