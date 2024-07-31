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
 * 
 * @description
 * This function uses tabulation (bottom-up dynamic programming) to compute the nth Fibonacci number.
 * It iteratively computes each Fibonacci number from 0 to n and stores them in an array.
 * This approach ensures that each Fibonacci number is computed only once, resulting in a time complexity of O(n).
 *
 * @example
 * // Compute the 10th Fibonacci number
 * const fib10: number = fibonacci(10);
 * console.log(fib10); // 55
 *
 * @example
 * // Compute the 20th Fibonacci number
 * const fib20: number = fibonacci(20);
 * console.log(fib20); // 6765

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
