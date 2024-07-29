/**
 * Performs a linear search on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to search.
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
 * const index = linearSearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * 
 * @example
 * // For strings
 * const strings = ["apple", "banana", "cherry", "date"];
 * const targetString = "cherry";
 * const index = linearSearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2
 * @complexity
 * Time complexity: O(n), where n is the number of elements in the array.
 * Space complexity: O(1).
 */
export default function linearSearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {
    const n: number = array.length;

    for (let i: number = 0; i < n; i++) {
        if (compare(array[i], target) === 0) {
            return i;
        }
    }

    return -1;
}