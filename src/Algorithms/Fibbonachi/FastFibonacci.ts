/**
 * Computes the nth Fibonacci number using matrix exponentiation.
 *
 * The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1. This function returns the nth number in the Fibonacci sequence.
 *
 * @param {number} n - The position in the Fibonacci sequence to compute. Must be a non-negative integer.
 * @returns {number} The nth Fibonacci number. Returns -1 if the input is a negative number.
 * 
 * @complexity
 * Time complexity: O(log n) - We use matrix exponentiation to compute the nth Fibonacci number.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * This function uses matrix exponentiation to compute the nth Fibonacci number efficiently.
 * The Fibonacci sequence can be represented using the following matrix equation:
 * 
 * [ F(n+1) ] = [ 1 1 ]^n * [ F(1) ]
 * [ F(n)   ]   [ 1 0 ]     [ F(0) ]
 * 
 * By raising the matrix to the power of n, we can compute the nth Fibonacci number in O(log n) time.
 *
 * @example
 * // Compute the 10th Fibonacci number
 * const fib10: number = fastFibonacci(10);
 * console.log(fib10); // 55
 *
 * @example
 * // Compute the 20th Fibonacci number
 * const fib20: number = fastFibonacci(20);
 * console.log(fib20); // 6765

 */
export  function fastFibonacci(n: number): number {
    if (n < 0) return -1;
    if (n === 0) return 0;
    if (n === 1) return 1;

    const F: number[][] = [
        [1, 1],
        [1, 0]
    ];

    function matrixMultiply(a: number[][], b: number[][]): number[][] {
        return [
            [
                a[0][0] * b[0][0] + a[0][1] * b[1][0],
                a[0][0] * b[0][1] + a[0][1] * b[1][1]
            ],
            [
                a[1][0] * b[0][0] + a[1][1] * b[1][0],
                a[1][0] * b[0][1] + a[1][1] * b[1][1]
            ]
        ];
    }

    function matrixPower(matrix: number[][], power: number): number[][] {
        if (power === 1) return matrix;

        if (power % 2 === 0) {
            const halfPower: number[][] = matrixPower(matrix, power / 2);
            return matrixMultiply(halfPower, halfPower);
        } else {
            return matrixMultiply(matrix, matrixPower(matrix, power - 1));
        }
    }

    const result: number[][] = matrixPower(F, n - 1);
    return result[0][0];
}