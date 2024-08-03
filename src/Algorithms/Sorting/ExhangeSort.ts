import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";

/**
 * Performs an exchange sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the exchange sort.
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
 * Time complexity: O(n^2) - Exchange sort has a quadratic time complexity.
 * Space complexity: O(1) - Exchange sort is an in-place sorting algorithm.
 * 
 * @description
 * Exchange sort is a simple comparison-based sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order.
 * 
 * The algorithm works as follows:
 * 1. Iterate through the array.
 * 2. For each element, compare it with every other element.
 * 3. Swap elements if they are in the wrong order.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = exchangeSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = exchangeSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function exchangeSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (compare(array[i], array[j]) > 0) {
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    }
    return array;
}