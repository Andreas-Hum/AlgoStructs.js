/**
 * Performs a ternary search on a sorted array.
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
 * Ternary search works by dividing the array into three parts and determining
 * which part the target element lies in, then recursively searching that part.
 * 
 * @example
 * // For numbers
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber = 5;
 * const index = ternarySearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings = ["apple", "banana", "cherry", "date"];
 * const targetString = "cherry";
 * const index = ternarySearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2
 * 
 * @complexity
 * Time complexity: O(log3 n), where n is the number of elements in the array.
 * Space complexity: O(1).
 */
export default function ternarySearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {
    let left: number = 0;
    let right: number = array.length - 1;

    while (left <= right) {
        let mid_1: number = left + Math.floor((right - left) / 3);
        let mid_2: number = right - Math.floor((right - left) / 3);
        let mid_1_comparison: number = compare(array[mid_1], target);
        let mid_2_comparison: number = compare(array[mid_2], target);

        if (mid_1_comparison === 0) {
            return mid_1;
        } else if (mid_2_comparison === 0) {
            return mid_2;
        }

        if (mid_1_comparison > 0) {
            right = mid_1 - 1;
        } else if (mid_2_comparison < 0) {
            left = mid_2 + 1;
        } else {
            left = mid_1 + 1;
            right = mid_2 - 1;
        }
    }

    return -1;
}

