/**
 * Computes all prime numbers up to a given limit using an optimized Sieve of Eratosthenes algorithm.
 *
 * The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to a specified integer.
 *
 * @param {number} n - The upper limit (inclusive) to find prime numbers. Must be a non-negative integer.
 * @returns {number[]} An array of prime numbers up to the given limit.
 * 
 * @complexity
 * Time complexity: O(n log log n) - The Sieve of Eratosthenes runs in near-linear time.
 * Space complexity: O(n) - We use an array of size n to store the primality of each number.
 * 
 * @description
 * The Sieve of Eratosthenes algorithm works as follows:
 * 1. Create a boolean array `isPrime` of size `n + 1` and initialize all entries to `true`.
 * 2. Set `isPrime[0]` and `isPrime[1]` to `false` since 0 and 1 are not prime numbers.
 * 3. For each number `i` from 2 to the square root of `n`:
 *    a. If `isPrime[i]` is `true`, mark all multiples of `i` from `i*i` to `n` as `false`.
 * 4. Collect all numbers that are still marked as `true` in the `isPrime` array into the result array.
 *
 * @example
 * // Find all prime numbers up to 10
 * const primesUpTo10 = sieveOfEratosthenes(10);
 * console.log(primesUpTo10); // [2, 3, 5, 7]
 *
 * @example
 * // Find all prime numbers up to 20
 * const primesUpTo20 = sieveOfEratosthenes(20);
 * console.log(primesUpTo20); // [2, 3, 5, 7, 11, 13, 17, 19]

 */
export default function sieveOfEratosthenes(n: number): number[] {
    if (n < 2) return [];

    const isPrime: boolean[] = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i: number = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primes: number[] = [2];
    for (let i: number = 3; i <= n; i += 2) {
        if (isPrime[i]) {
            primes.push(i);
        }
    }

    return primes;
}

