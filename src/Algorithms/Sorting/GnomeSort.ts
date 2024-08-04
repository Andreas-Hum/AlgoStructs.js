import { SortOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a gnome sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the gnome sort.
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
 * Time complexity: O(n^2) in the worst case.
 * Space complexity: O(1) - Gnome sort is an in-place sorting algorithm.
 * 
 * @description
 * Gnome sort is a simple comparison-based sorting algorithm. It is similar to insertion sort but moves elements to their correct position by a series of swaps, similar to the way a gnome sorts a line of flower pots.
 * 
 * The algorithm works as follows:
 * 1. Start at the beginning of the array.
 * 2. If the current element is in the correct order with the previous element, move to the next element.
 * 3. If the current element is not in the correct order with the previous element, swap them and move one step back.
 * 4. Repeat steps 2-3 until the end of the array is reached.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = gnomeSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = gnomeSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function gnomeSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;
    let pos: number = 0;

    while (pos < n) {
        if (pos === 0 || compare(array[pos], array[pos - 1]) >= 0) {
            pos++;
        } else {
            [array[pos], array[pos - 1]] = [array[pos - 1], array[pos]];
            pos--;
        }
    }
    return array;
}