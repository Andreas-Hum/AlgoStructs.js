/**
 * Performs a binary search on a sorted array.
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
 * @example
 * // For numbers
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber = 5;
 * const index = binarySearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings = ["apple", "banana", "cherry", "date"];
 * const targetString = "cherry";
 * const index = binarySearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2
 * @complexity
 * Time complexity: O(log n), where n is the number of elements in the array.
 * Space complexity: O(1).
 */
export default function binarySearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {
    let left: number = 0;
    let right: number = array.length - 1;

    while (left <= right) {
        const mid: number = Math.floor((left + right) / 2);
        const cmp: number = compare(array[mid], target);

        if (cmp === 0) {
            return mid;
        } else if (cmp < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}