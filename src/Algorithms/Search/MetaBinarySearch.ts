/**
 * Performs a meta binary search on a sorted array this is also known as one-sided binary search.
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
 * const index = metaBinarySearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings = ["apple", "banana", "cherry", "date"];
 * const targetString = "cherry";
 * const index = metaBinarySearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2
 * 
 * @complexity
 * Time complexity: O(log n), where n is the number of elements in the array.
 * Space complexity: O(1).
 */
export default function metaBinarySearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {
    const n: number = array.length;
    const max_steps: number = Math.floor(Math.log2(n - 1)) + 1;

    let current_index: number = 0;

    for (let step: number = max_steps - 1; step >= 0; step--) {
        let new_index: number = current_index + (1 << step);

        if (new_index >= n) {
            continue;
        } else {
            let comparison: number = compare(array[new_index], target);

            if (comparison === 0) {
                return new_index;
            } else if (comparison < 0) {
                current_index = new_index;
            }
        }
    }

    return -1;
}