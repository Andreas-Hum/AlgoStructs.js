/**
 * Performs the Miller-Rabin primality test to check if a number is prime.
 * 
 * @param {number} n - The number to test for primality.
 * @param {number} k - The number of iterations to perform, higher values increase accuracy.
 * @returns {boolean} `true` if the number is likely prime, `false` otherwise.
 * @complexity O(k * log^3 n) - The complexity is dependent on the number of iterations and the size of the number.
 */
export default function millerRabin(n: number, k: number): boolean {
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
