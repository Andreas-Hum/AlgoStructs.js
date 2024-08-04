import { bucketSort } from '../../../src/Algorithms/Sorting';
import * as fc from 'fast-check';

describe('bucketSort', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    test('should sort numbers in ascending order', () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer({ min: -100, max: 100 }), { minLength: 0, maxLength: 1000 }),
                (array) => {
                    const sortedArray: number[] = bucketSort({ array });
                    for (let i: number = 1; i < sortedArray.length; i++) {
                        expect(sortedArray[i - 1]).toBeLessThanOrEqual(sortedArray[i]);
                    }
                }
            )
        );
    });
});