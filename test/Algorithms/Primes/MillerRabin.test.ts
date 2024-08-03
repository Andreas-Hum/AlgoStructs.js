// MillerRabin.test.ts
import { millerRabin, isPrime } from '../../../src/Algorithms/Primes';
import * as fc from 'fast-check';

describe('millerRabin', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });
    test('prime numbers should return true', () => {
        fc.assert(
            fc.property(fc.integer({ min: 10, max: 1000 }), (num) => {
                if (isPrime(num)) {
                    expect(millerRabin(num, 5)).toBe(true);
                }
            })
        );
    });

    test('composite numbers should return false', () => {
        fc.assert(
            fc.property(fc.integer({ min: 10, max: 1000 }), (num) => {
                if (!isPrime(num)) {
                    expect(millerRabin(num, 5)).toBe(false);
                }
            })
        );
    });

    test('function should be consistent for the same input', () => {
        fc.assert(
            fc.property(fc.integer({ min: 10, max: 1000 }), fc.integer({ min: 2, max: 10 }), (n, k) => {
                const result1 = millerRabin(n, k);
                const result2 = millerRabin(n, k);
                expect(result1).toBe(result2);
            })
        );
    });
});