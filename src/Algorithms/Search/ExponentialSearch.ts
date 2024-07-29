import binarySearch from "./BinarySearch";


/**
 * Performs an exponential search on a sorted array.
 * 
 * @template T - The type of elements in the array.
 * @param {T[]} array - The sorted array to search.
 * @param {T} target - The element to search for.
 * @param {(a: T, b: T) => number} compare - The comparison function.
 * @returns {number} - The index of the target element, or -1 if not found.
 * 
 * @remarks
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * Exponential search works by finding a range where the target element could be,
 * and then performing a binary search within that range.
 * 
 * @example
 * // For numbers
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber = 5;
 * const index = exponentialSearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings = ["apple", "banana", "cherry", "date"];
 * const targetString = "cherry";
 * const index = exponentialSearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2
 * 
 * @complexity
 * Time complexity: O(log n), where n is the number of elements in the array.
 * Space complexity: O(1).
 */
export default function exponentialSearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {
    let n: number = array.length;

    if (n === 0) {
        return -1;
    }

    let bound: number = 1;

    while (bound < n && compare(array[bound], target) < 0) {
        bound *= 2;
    }

    return binarySearch(array, target, compare);
}