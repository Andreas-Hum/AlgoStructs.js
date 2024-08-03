import { SearchOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a ternary search on a sorted array.
 * 
 * @template T - The type of elements in the array.
 * @param {SearchOptions<T>} options - The options for the ternary search.
 * @param {T[]} options.array - The sorted array to search.
 * @param {T} options.target - The element to search for.
 * @param {(a: T, b: T) => number} options.compare - The comparison function.
 * @returns {number} - The index of the target element, or -1 if not found.
 * 
 * @remarks
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * @complexity
 * Time complexity: O(log3 n) - Ternary search runs in logarithmic time.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Ternary search is a divide-and-conquer algorithm that works by dividing the array into three parts.
 * It determines which part the target element lies in and then iteratively searches that part.
 * 
 * The algorithm works as follows:
 * 1. Divide the array into three parts by calculating two midpoints, `mid1` and `mid2`.
 *    - `mid1` is one-third of the way through the array.
 *    - `mid2` is two-thirds of the way through the array.
 * 2. Compare the target element with the elements at `mid1` and `mid2`.
 * 3. If the target element is equal to the element at `mid1`, return `mid1`.
 * 4. If the target element is equal to the element at `mid2`, return `mid2`.
 * 5. If the target element is less than the element at `mid1`, recursively search the left third of the array.
 * 6. If the target element is greater than the element at `mid2`, recursively search the right third of the array.
 * 7. If the target element is between the elements at `mid1` and `mid2`, recursively search the middle third of the array.
 * 8. Repeat the process until the target element is found or the subarray size reduces to zero.
 * 
 * Ternary search is more efficient than binary search for large datasets because it reduces the search space more quickly.
 * However, it requires more comparisons per iteration, which can make it less efficient for smaller datasets.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber: number = 5;
 * const index: number = ternarySearch({ array: numbers, target: targetNumber, compare: (a, b) => a - b });
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings: string[] = ["apple", "banana", "cherry", "date"];
 * const targetString: string = "cherry";
 * const index: number = ternarySearch({ array: strings, target: targetString, compare: (a, b) => a.localeCompare(b) });
 * console.log(index); // Output: 2
 */
export function ternarySearch<T>({ array, target, compare }: SearchOptions<T>): number {
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