/**
 * Sieve of Atkin algorithm to find all prime numbers up to a given limit.
 * 
 * @param {number} limit - The upper limit to find primes up to.
 * @returns {number[]} An array of prime numbers up to the given limit.
 * @complexity O(n / log log n) - The complexity is sublinear in the size of the input.
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

