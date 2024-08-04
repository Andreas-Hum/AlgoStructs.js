import { cocktailSort } from '../../../src/Algorithms/Sorting';
import * as fc from 'fast-check';

describe('cocktailSort', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    test('should sort numbers in ascending order', () => {
        fc.assert(
            fc.property(fc.array(fc.integer()), (array) => {
                const sortedArray: number[] = cocktailSort({ array, compare: (a, b) => a - b });
                for (let i: number = 1; i < sortedArray.length; i++) {
                    expect(sortedArray[i - 1]).toBeLessThanOrEqual(sortedArray[i]);
                }
            })
        );
    });

    test('should sort strings in alphabetical order', () => {
        fc.assert(
            fc.property(fc.array(fc.string()), (array) => {
                const sortedArray: string[] = cocktailSort({ array, compare: (a, b) => a.localeCompare(b) });
                for (let i: number = 1; i < sortedArray.length; i++) {
                    expect(sortedArray[i - 1].localeCompare(sortedArray[i])).toBeLessThanOrEqual(0);
                }
            })
        );
    });

    test('should handle empty array', () => {
        const sortedArray: number[] = cocktailSort({ array: [], compare: (a, b) => a - b });
        expect(sortedArray).toEqual([]);
    });

    test('should handle array with one element', () => {
        fc.assert(
            fc.property(fc.integer(), (value) => {
                const sortedArray: number[] = cocktailSort({ array: [value], compare: (a, b) => a - b });
                expect(sortedArray).toEqual([value]);
            })
        );
    });

    test('should sort array with custom objects', () => {
        fc.assert(
            fc.property(
                fc.array(fc.record({ id: fc.integer(), name: fc.string() })),
                (array) => {
                    const sortedArray: {
                        id: number;
                        name: string;
                    }[] = cocktailSort({
                        array,
                        compare: (a, b) => a.id - b.id,
                    });
                    for (let i: number = 1; i < sortedArray.length; i++) {
                        expect(sortedArray[i - 1].id).toBeLessThanOrEqual(sortedArray[i].id);
                    }
                }
            )
        );
    });
});
