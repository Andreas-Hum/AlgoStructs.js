import { SortOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a comb sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the comb sort.
 * @param {T[]} options.array - The array to be sorted.
 * @param {(a: T, b: T) => number} options.compare - The comparison function.
 * @returns {T[]} - The sorted array.
 * 
 * @remarks
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * @complexity
 * Time complexity: O(n^2) in the worst case, O(n log n) on average.
 * Space complexity: O(1) - Comb sort is an in-place sorting algorithm.
 * 
 * @description
 * Comb sort is an improvement over bubble sort. It eliminates turtles, or small values near the end of the list, by using a gap sequence to compare elements that are farther apart. The gap is reduced in each iteration until it becomes 1, at which point the algorithm becomes similar to bubble sort.
 * 
 * The algorithm works as follows:
 * 1. Initialize the gap to the length of the array.
 * 2. Reduce the gap using a shrink factor (typically 1.3).
 * 3. Compare and swap elements that are gap distance apart.
 * 4. Repeat until the gap is 1 and the array is sorted.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = combSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = combSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function combSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;
    const shrink_factor: number = 1.3;

    let gap: number = n;
    let sorted: boolean = false;

    while (!sorted) {
        gap = Math.floor(gap / shrink_factor);

        if (gap <= 1) {
            gap = 1;
            sorted = true;
        } else if (gap === 9 || gap === 10) {
            gap = 11;
        }

        for (let i: number = 0; i + gap < n; i++) {
            if (compare(array[i], array[i + gap]) > 0) {
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
                sorted = false;
            }
        }
    }

    return array;
}