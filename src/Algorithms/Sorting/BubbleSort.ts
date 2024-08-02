import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";

/**
 * Performs a bubble sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the bubble sort.
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
 * Time complexity: O(n^2) - Bubble sort has a quadratic time complexity.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they
 * are in the wrong order. The pass through the list is repeated until the list is sorted.
 * 
 * The algorithm works as follows:
 * 1. Iterate over the array from the first element to the last.
 * 2. For each element, iterate over the array from the current element to the last.
 * 3. Compare the current element with the next element using the comparison function.
 * 4. If the current element is greater than the next element, swap them.
 * 5. Repeat steps 2-4 until the array is sorted.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = bubbleSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = bubbleSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function bubbleSort<T>({ array, compare }: SortOptions<T>): T[] {
    for (let i: number = 0; i < array.length; i++) {
        for (let j: number = i; j < array.length; j++) {
            if (compare(array[i], array[j]) > 0) {
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    }
    return array;
}