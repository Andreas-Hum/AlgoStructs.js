/**
 * Computes the nth Fibonacci number using tabulation.
 *
 * The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1. This function returns the nth number in the Fibonacci sequence.
 *
 * @param {number} n - The position in the Fibonacci sequence to compute. Must be a non-negative integer.
 * @returns {number} The nth Fibonacci number. Returns -1 if the input is a negative number.
 */
export function fibonacci(n: number): number {
    if (n < 0) return -1;

    const fibonacci: number[] = [0];

    if (n >= 1) {
        fibonacci.push(1)
    }

    for (let i = 2; i <= n; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2])
    }

    return fibonacci[n]
};

/**
 * Computes the nth Fibonacci number using matrix exponentiation.
 *
 * The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones,
 * usually starting with 0 and 1. This function returns the nth number in the Fibonacci sequence.
 *
 * @param {number} n - The position in the Fibonacci sequence to compute. Must be a non-negative integer.
 * @returns {number} The nth Fibonacci number. Returns -1 if the input is a negative number.
 *
 * @remarks
 * Time complexity: O(log n) - We use matrix exponentiation to compute the nth Fibonacci number.
 * Space complexity: O(1) - We use a constant amount of space.
 */
export function fastFibonacci(n: number): number {
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