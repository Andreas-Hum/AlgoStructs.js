import { SortOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a cocktail sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the cocktail sort.
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
 * Time complexity: O(n^2) - In the worst case.
 * Space complexity: O(1) - Cocktail sort is an in-place sorting algorithm.
 * 
 * @description
 * Cocktail sort is a variation of bubble sort that sorts in both directions on each pass through the list. This algorithm improves on bubble sort by allowing the array to be sorted from both ends, which can help to move small elements to the beginning and large elements to the end more quickly.
 * 
 * The algorithm works as follows:
 * 1. Traverse the array from left to right, swapping adjacent elements if they are in the wrong order.
 * 2. If no elements were swapped, the array is sorted.
 * 3. Traverse the array from right to left, swapping adjacent elements if they are in the wrong order.
 * 4. Repeat steps 1-3 until no elements are swapped in both traversals.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = cocktailSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = cocktailSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function cocktailSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;
    let swapped: boolean;

    do {
        swapped = false;

        for (let i: number = 0; i < n - 1; i++) {
            if (compare(array[i], array[i + 1]) > 0) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }

        swapped = false;

        for (let i: number = n - 1; i > 0; i--) {
            if (compare(array[i], array[i - 1]) < 0) {
                [array[i], array[i - 1]] = [array[i - 1], array[i]];
                swapped = true;
            }
        }

    } while (swapped);

    return array;
}