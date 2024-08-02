// test/Algorithms/Divisor/LeastCommonDivisor.test.ts
import { leastCommonDivisor, greatestCommonDivisor } from "../../../src/Algorithms/Divisor";
import * as fc from "fast-check";



describe("leastCommonDivisor", () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    it("should return the correct LCD for two non-negative integers", () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 1000000 }),  // Limiting the max to a reasonable range
                fc.integer({ min: 1, max: 1000000 }),
                (a, b) => {
                    const lcd = leastCommonDivisor(a, b);
                    if (lcd % a !== 0 || lcd % b !== 0) {
                        console.error(`Test failed for a=${a}, b=${b}, lcd=${lcd}`);
                    }
                    return lcd % a === 0 && lcd % b === 0;
                }
            )
        );
    });

    it("should return 0 if either number is zero", () => {
        fc.assert(
            fc.property(
                fc.nat(),
                (a) => {
                    const lcd1 = leastCommonDivisor(a, 0);
                    const lcd2 = leastCommonDivisor(0, a);
                    return lcd1 === 0 && lcd2 === 0;
                }
            )
        );
    });

    it("should return the product of two coprime numbers", () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 1000 }),
                fc.integer({ min: 1, max: 1000 }),
                (a, b) => {
                    const gcd = greatestCommonDivisor(a, b);
                    const lcd = leastCommonDivisor(a, b);
                    return gcd === 1 ? lcd === a * b : lcd % a === 0 && lcd % b === 0;
                }
            )
        );
    });

    it("should return the correct LCD for known pairs", () => {
        const cases = [
            { a: 21, b: 6, expected: 42 },
            { a: 8, b: 9, expected: 72 },
            { a: 15, b: 25, expected: 75 },
            { a: 7, b: 3, expected: 21 },
        ];

        cases.forEach(({ a, b, expected }) => {
            const lcd = leastCommonDivisor(a, b);
            expect(lcd).toBe(expected);
        });
    });

    it("should handle large numbers", () => {
        const a = 123456, b = 789012;
        const lcd = leastCommonDivisor(a, b);
        const gcd = greatestCommonDivisor(a, b);
        expect(lcd).toBe((a * b) / gcd);
    });
});
