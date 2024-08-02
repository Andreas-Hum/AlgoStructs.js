// IsPrime.test.ts
import { isPrime } from '../../../src/Algorithms/Primes'
import * as fc from 'fast-check';

describe('isPrime', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });
    test('prime numbers should only be divisible by 1 and itself', () => {
        fc.assert(
            fc.property(fc.integer({ min: 2, max: 1000 }), (num) => {
                if (isPrime(num)) {
                    for (let i = 2; i < num; i++) {
                        expect(num % i).not.toBe(0);
                    }
                }
            })
        );
    });

    test('non-prime numbers should have at least one divisor other than 1 and itself', () => {
        fc.assert(
            fc.property(fc.integer({ min: 2, max: 1000 }), (num) => {
                if (!isPrime(num)) {
                    let hasDivisor = false;
                    for (let i = 2; i < num; i++) {
                        if (num % i === 0) {
                            hasDivisor = true;
                            break;
                        }
                    }
                    expect(hasDivisor).toBe(true);
                }
            })
        );
    });

    test('negative numbers, 0, and 1 should not be prime', () => {
        fc.assert(
            fc.property(fc.integer({ min: -1000, max: 1 }), (num) => {
                expect(isPrime(num)).toBe(false);
            })
        );
    });
});