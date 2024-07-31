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
 * @complexity
 * Time complexity: O(log n) - Binary search runs in logarithmic time.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing
 * the search interval in half. If the value of the search key is less than the item in the middle of the interval, narrow the interval
 * to the lower half. Otherwise, narrow it to the upper half. Repeatedly check until the value is found or the interval is empty.
 * 
 * The algorithm works as follows:
 * 1. Initialize two pointers, `left` and `right`, to the start and end of the array, respectively.
 * 2. Calculate the middle index, `mid`, as the average of `left` and `right`.
 * 3. Compare the target element with the element at the `mid` index.
 * 4. If the target element is equal to the element at `mid`, return `mid`.
 * 5. If the target element is less than the element at `mid`, update `right` to `mid - 1` to search the left half of the array.
 * 6. If the target element is greater than the element at `mid`, update `left` to `mid + 1` to search the right half of the array.
 * 7. Repeat steps 2-6 until the target element is found or the search space is exhausted (`left` exceeds `right`).
 * 8. If the target element is not found, return -1.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber: number = 5;
 * const index: number = binarySearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * // For strings
 * @example
 * const strings: string[] = ["apple", "banana", "cherry", "date"];
 * const targetString: string = "cherry";
 * const index: number = binarySearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2

 * 
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