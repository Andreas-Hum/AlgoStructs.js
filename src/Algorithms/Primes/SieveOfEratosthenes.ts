/**
 * Computes all prime numbers up to a given limit using an optimized Sieve of Eratosthenes algorithm.
 *
 * The Sieve of Eratosthenes is an ancient algorithm for finding all prime numbers up to a specified integer.
 *
 * @param {number} n - The upper limit (inclusive) to find prime numbers. Must be a non-negative integer.
 * @returns {number[]} An array of prime numbers up to the given limit.
 *
 * @remarks
 * Time complexity: O(n log log n) - The Sieve of Eratosthenes runs in near-linear time.
 * Space complexity: O(n) - We use an array of size n to store the primality of each number.
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

