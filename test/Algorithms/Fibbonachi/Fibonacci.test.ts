// Fibbonachi.test.ts
import { fibonacci } from "../../../src/Algorithms/Fibbonachi";
import * as fc from 'fast-check';

describe('Fibonacci Function', () => {
    test('should return 0 for input 0', () => {
        expect(fibonacci(0)).toBe(0);
    });

    test('should return 1 for input 1', () => {
        expect(fibonacci(1)).toBe(1);
    });

    test('should return 1 for input 2', () => {
        expect(fibonacci(2)).toBe(1);
    });

    test('should return 2 for input 3', () => {
        expect(fibonacci(3)).toBe(2);
    });

    test('should return 3 for input 4', () => {
        expect(fibonacci(4)).toBe(3);
    });

    test('should return 5 for input 5', () => {
        expect(fibonacci(5)).toBe(5);
    });

    test('should return 8 for input 6', () => {
        expect(fibonacci(6)).toBe(8);
    });

    test('fibonacci(n) should be the sum of fibonacci(n-1) and fibonacci(n-2) for n > 1', () => {
        fc.assert(
            fc.property(fc.integer({ min: 2, max: 20 }), (n) => {
                expect(fibonacci(n)).toBe(fibonacci(n - 1) + fibonacci(n - 2));
            })
        );
    });

    test('fibonacci(n) should be greater than or equal to 0 for n >= 0', () => {
        fc.assert(
            fc.property(fc.integer({ min: 0, max: 20 }), (n) => {
                expect(fibonacci(n)).toBeGreaterThanOrEqual(0);
            })
        );
    });
});