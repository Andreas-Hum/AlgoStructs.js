// FastFibonacci.test.ts
import { fastFibonacci } from "../../../src/Algorithms/Fibbonachi";
import * as fc from 'fast-check';

describe('fastFibonacci Function', () => {
    test('should return 0 for input 0', () => {
        expect(fastFibonacci(0)).toBe(0);
    });

    test('should return 1 for input 1', () => {
        expect(fastFibonacci(1)).toBe(1);
    });

    test('should return 1 for input 2', () => {
        expect(fastFibonacci(2)).toBe(1);
    });

    test('should return 2 for input 3', () => {
        expect(fastFibonacci(3)).toBe(2);
    });

    test('should return 3 for input 4', () => {
        expect(fastFibonacci(4)).toBe(3);
    });

    test('should return 5 for input 5', () => {
        expect(fastFibonacci(5)).toBe(5);
    });

    test('should return 8 for input 6', () => {
        expect(fastFibonacci(6)).toBe(8);
    });

    test('fastFibonacci(n) should be the sum of fastFibonacci(n-1) and fastFibonacci(n-2) for n > 1', () => {
        fc.assert(
            fc.property(fc.integer({ min: 2, max: 20 }), (n) => {
                expect(fastFibonacci(n)).toBe(fastFibonacci(n - 1) + fastFibonacci(n - 2));
            })
        );
    });

    test('fastFibonacci(n) should be greater than or equal to 0 for n >= 0', () => {
        fc.assert(
            fc.property(fc.integer({ min: 0, max: 20 }), (n) => {
                expect(fastFibonacci(n)).toBeGreaterThanOrEqual(0);
            })
        );
    });
});