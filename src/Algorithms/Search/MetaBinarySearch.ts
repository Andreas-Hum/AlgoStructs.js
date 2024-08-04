import { SearchOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a meta binary search on a sorted array this is also known as one-sided binary search.
 * 
 * @template T - The type of elements in the array.
 * @param {SearchOptions<T>} options - The options for the meta binary search.
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
 * Time complexity: O(log n) - Where n is the number of elements in the array.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Meta binary search is a variation of the binary search algorithm that focuses on reducing the search space
 * by repeatedly dividing the array into two halves and comparing the target element with the middle element it does this by bit manipulation.
 * 
 * The algorithm works as follows:
 * 1. Initialize two pointers, `low` and `high`, to the start and end of the array, respectively.
 * 2. Calculate the middle index, `mid`, using bit manipulation to avoid potential overflow: `mid = low + ((high - low) >> 1)`.
 * 3. Compare the target element with the element at the `mid` index.
 * 4. If the target element is equal to the element at `mid`, return `mid`.
 * 5. If the target element is less than the element at `mid`, update `high` to `mid - 1` to search the left half of the array.
 * 6. If the target element is greater than the element at `mid`, update `low` to `mid + 1` to search the right half of the array.
 * 7. Repeat steps 2-6 until the target element is found or the search space is exhausted (`low` exceeds `high`).
 * 8. If the target element is not found, return -1.
 * 
 * This algorithm uses bit manipulation to calculate the middle index efficiently and avoid potential overflow issues.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber: number = 5;
 * const index: number = metaBinarySearch({ array: numbers, target: targetNumber, compare: (a, b) => a - b });
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings: string[] = ["apple", "banana", "cherry", "date"];
 * const targetString: string = "cherry";
 * const index: number = metaBinarySearch({ array: strings, target: targetString, compare: (a, b) => a.localeCompare(b) });
 * console.log(index); // Output: 2
 */
export function metaBinarySearch<T>({ array, target, compare }: SearchOptions<T>): number {
    const n: number = array.length;
    if (n === 0) return -1; 

    const maxSteps: number = Math.floor(Math.log2(n - 1)) + 1;

    let currentIndex: number = 0;

    for (let step: number = maxSteps - 1; step >= 0; step--) {
        const newIndex: number = currentIndex + (1 << step);

        if (newIndex >= n) {
            continue;
        } else {
            const comparison: number = compare(array[newIndex], target);

            if (comparison === 0) {
                return newIndex;
            } else if (comparison < 0) {
                currentIndex = newIndex;
            }
        }
    }

    if (compare(array[currentIndex], target) === 0) {
        return currentIndex;
    }

    return -1;
}