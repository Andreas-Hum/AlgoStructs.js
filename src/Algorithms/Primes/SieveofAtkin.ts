/**
 * Sieve of Atkin algorithm to find all prime numbers up to a given limit.
 * 
 * @param {number} limit - The upper limit to find primes up to.
 * @returns {number[]} An array of prime numbers up to the given limit.
 * 
 * @complexity
 * Time complexity: O(n / log log n) - The Sieve of Atkin is more efficient than the Sieve of Eratosthenes for large n.
 * Space complexity: O(n) - We use an array of size n to mark prime numbers.
 *
 * 
 * @description
 * The Sieve of Atkin is an efficient algorithm to find all prime numbers up to a specified integer.
 * It is an optimized version of the ancient Sieve of Eratosthenes and works by marking potential primes
 * based on certain quadratic forms and then eliminating multiples of squares of primes.
 * 
 * The algorithm works as follows:
 * 1. Initialize a boolean array `primes` of size `limit + 1` to `false`.
 * 2. For each pair of integers `(x, y)` such that `1 <= x, y <= sqrt(limit)`:
 *    a. Compute `n = 4*x^2 + y^2`. If `n <= limit` and `n % 12 == 1` or `n % 12 == 5`, toggle `primes[n]`.
 *    b. Compute `n = 3*x^2 + y^2`. If `n <= limit` and `n % 12 == 7`, toggle `primes[n]`.
 *    c. Compute `n = 3*x^2 - y^2`. If `x > y` and `n <= limit` and `n % 12 == 11`, toggle `primes[n]`.
 * 3. Mark all multiples of squares of primes as non-prime.
 * 4. Collect all numbers marked as prime into the result array.
 * 
 * @example
 * // Find all prime numbers up to 30
 * const primesUpTo30: number[] = sieveOfAtkin(30);
 * console.log(primesUpTo30); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
 * 
 * @example
 * // Find all prime numbers up to 50
 * const primesUpTo50: number[] = sieveOfAtkin(50);
 * console.log(primesUpTo50); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

 */
export default function sieveOfAtkin(limit: number): number[] {
    const primes: boolean[] = new Array(limit + 1).fill(false);
    const sqrtLimit: number = Math.sqrt(limit);

    for (let x: number = 1; x <= sqrtLimit; x++) {
        for (let y: number = 1; y <= sqrtLimit; y++) {
            let n: number = 4 * x * x + y * y;
            if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
                primes[n] = !primes[n];
            }
            n = 3 * x * x + y * y;
            if (n <= limit && n % 12 === 7) {
                primes[n] = !primes[n];
            }
            n = 3 * x * x - y * y;
            if (x > y && n <= limit && n % 12 === 11) {
                primes[n] = !primes[n];
            }
        }
    }

    for (let n: number = 5; n <= sqrtLimit; n++) {
        if (primes[n]) {
            const k: number = n * n;
            for (let i: number = k; i <= limit; i += k) {
                primes[i] = false;
            }
        }
    }

    const result: number[] = [2, 3];
    for (let n: number = 5; n <= limit; n++) {
        if (primes[n]) {
            result.push(n);
        }
    }

    return result;
}

