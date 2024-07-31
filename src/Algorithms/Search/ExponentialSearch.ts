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
* @complexity
 * Time complexity: O(log n) - Exponential search runs in logarithmic time.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Exponential search is an algorithm that combines binary search with an initial exponential search phase to find a range where the target element could be.
 * It is particularly useful for unbounded or infinite lists.
 * 
 * The algorithm works as follows:
 * 1. Start with a bound of 1.
 * 2. Double the bound while the element at the current bound is less than the target element and the bound is within the array length.
 * 3. Once the bound is found, perform a binary search within the range from the previous bound to the current bound or the end of the array, whichever is smaller.
 * 
 * @example
 * // For numbers
 * const numbers: number[]  = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber :number  = 5;
 * const index: number  = exponentialSearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * @example
 * // For strings
 * const strings: string[] = ["apple", "banana", "cherry", "date"];
 * const targetString: string = "cherry";
 * const index: number = exponentialSearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2
 * 
 * 
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