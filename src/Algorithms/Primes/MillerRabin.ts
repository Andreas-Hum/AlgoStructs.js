/**
 * Performs the Miller-Rabin primality test to check if a number is prime.
 * 
 * @param {number} n - The number to test for primality.
 * @param {number} k - The number of iterations to perform, higher values increase accuracy.
 * @returns {boolean} `true` if the number is likely prime, `false` otherwise.
 * 
 * @complexity
 * Time complexity: O(log(min(a, b))) - The function relies on the Euclidean algorithm for GCD, which runs in logarithmic time.
 * Space complexity: O(1) - We use a constant amount of space.
 *
 *
 * @description
 * The Miller-Rabin primality test is a probabilistic algorithm used to determine if a number is a probable prime.
 * It is based on properties of modular arithmetic and is particularly useful for large numbers.
 * 
 * The algorithm works as follows:
 * 1. Handle small cases: If `n` is less than or equal to 1 or equal to 4, return `false`. If `n` is less than or equal to 3, return `true`.
 * 2. Write `n - 1` as `2^r * d` where `d` is an odd number. This is done by dividing `n - 1` by 2 until it is odd.
 * 3. Repeat the following `k` times (where `k` is the number of iterations):
 *    a. Pick a random integer `a` in the range [2, n-2].
 *    b. Compute `x = a^d % n` using modular exponentiation.
 *    c. If `x` is 1 or `n-1`, continue to the next iteration.
 *    d. Repeat the following until `d` equals `n-1`:
 *       i. Compute `x = x^2 % n`.
 *       ii. If `x` is 1, return `false` (composite).
 *       iii. If `x` is `n-1`, break out of the loop and continue to the next iteration.
 *    e. If none of the above conditions are met, return `false` (composite).
 * 4. If all iterations pass, return `true` (probably prime).
 * 
 * @example
 * // Check if 17 is a prime number with 5 iterations
 * const result1: boolean = millerRabin(17, 5);
 * console.log(result1); // true
 * 
 * @example
 * // Check if 18 is a prime number with 5 iterations
 * const result2: boolean = millerRabin(18, 5);
 * console.log(result2); // false
 *
 */
export  function millerRabin(n: number, k: number): boolean {
    if (n <= 1 || n === 4) return false;
    if (n <= 3) return true;

    let d: number = n - 1;
    while (d % 2 === 0) {
        d /= 2;
    }

    /**
     * Computes (x^y) % p using modular exponentiation.
     * 
     * @param {number} x - The base.
     * @param {number} y - The exponent.
     * @param {number} p - The modulus.
     * @returns {number} The result of (x^y) % p.
     * @complexity O(log y) - The complexity is logarithmic in the exponent.
     */
    function power(x: number, y: number, p: number): number {
        let res: number = 1;
        x = x % p;
        while (y > 0) {
            if (y & 1) {
                res = (res * x) % p;
            }
            y = y >> 1;
            x = (x * x) % p;
        }
        return res;
    }

    /**
     * Performs a single iteration of the Miller-Rabin test.
     * 
     * @param {number} d - The odd part of n-1.
     * @param {number} n - The number to test for primality.
     * @returns {boolean} `true` if the test passes, `false` otherwise.
     * @complexity O(log n) - The complexity is logarithmic in the size of the number.
     */
    function millerTest(d: number, n: number): boolean {
        const a: number = 2 + Math.floor(Math.random() * (n - 4));
        let x: number = power(a, d, n);
        if (x === 1 || x === n - 1) return true;

        while (d !== n - 1) {
            x = (x * x) % n;
            d *= 2;

            if (x === 1) return false;
            if (x === n - 1) return true;
        }

        return false;
    }

    for (let i: number = 0; i < k; i++) {
        if (!millerTest(d, n)) return false;
    }

    return true;
}
