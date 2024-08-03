import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";

/**
 * Performs an insertion sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the insertion sort.
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
 * Time complexity: O(n^2) - Insertion sort has a quadratic time complexity in the worst case.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.
 * 
 * The algorithm works as follows:
 * 1. Iterate over the array from the second element to the last.
 * 2. For each element, compare it with the elements before it.
 * 3. If the element is smaller than the previous elements, swap them.
 * 4. Repeat steps 2-3 until the array is sorted.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = insertionSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = insertionSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function insertionSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;

    for (let i: number = 1; i < n; i++) {
        let j: number = i;
        while (j > 0 && compare(array[j - 1], array[j]) > 0) {
            [array[j - 1], array[j]] = [array[j], array[j - 1]];
            j--;
        }
    }

    return array;
}