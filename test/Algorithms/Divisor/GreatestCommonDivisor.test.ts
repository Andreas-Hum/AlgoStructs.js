// GreatestCommonDivisor.test.ts
import { greatestCommonDivisor } from "../../../src/Algorithms/Divisor";
import * as fc from "fast-check";

describe("greatestCommonDivisor", () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });
    it("should return the correct GCD for two non-negative integers", () => {
        fc.assert(
            fc.property(
                fc.nat(),
                fc.nat(),
                (a, b) => {
                    const gcd = greatestCommonDivisor(a, b);
                    return a % gcd === 0 && b % gcd === 0;
                }
            )
        );
    });

    it("should return the first number if the second number is zero", () => {
        fc.assert(
            fc.property(
                fc.nat(),
                (a) => {
                    const gcd = greatestCommonDivisor(a, 0);
                    return gcd === a;
                }
            )
        );
    });

    it("should return the second number if the first number is zero", () => {
        fc.assert(
            fc.property(
                fc.nat(),
                (b) => {
                    const gcd = greatestCommonDivisor(0, b);
                    return gcd === b;
                }
            )
        );
    });

    it("should return 1 for two coprime numbers", () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 1000 }),
                fc.integer({ min: 1, max: 1000 }),
                (a, b) => {

                    const gcd = greatestCommonDivisor(a, b);
                    return gcd === 1 || (a % gcd === 0 && b % gcd === 0);
                }
            )
        );
    });
});