/**
 * Checks if a given number is prime.
 * 
 * @param {number} num - The number to check for primality.
 * @returns {boolean} `true` if the number is prime, `false` otherwise.
 * 
 * @complexity
 * Time complexity: O(sqrt(n)) - The function checks divisibility up to the square root of the number.
 * Space complexity: O(1) - The function uses a constant amount of space.
 * 
 * @description
 * This function determines whether a given number is prime. A prime number is a natural number greater than 1
 * that is not a product of two smaller natural numbers. The function uses trial division to check for factors
 * up to the square root of the number. It first handles small cases and then checks divisibility by 2 and 3.
 * For larger numbers, it checks divisibility by numbers of the form 6k ± 1.
 * 
 * The algorithm works as follows:
 * 1. If the number is less than or equal to 1, return `false`.
 * 2. If the number is less than or equal to 3, return `true` (since 2 and 3 are prime).
 * 3. If the number is divisible by 2 or 3, return `false`.
 * 4. For numbers greater than 3, check divisibility by numbers of the form 6k ± 1 up to the square root of the number.
 * 
 * @example
 * // Check if 5 is a prime number
 * const isFivePrime: boolean = isPrime(5);
 * console.log(isFivePrime); // true
 * 
 * @example
 * // Check if 10 is a prime number
 * const isTenPrime: boolean = isPrime(10);
 * console.log(isTenPrime); // false
 */
export function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i: number = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};