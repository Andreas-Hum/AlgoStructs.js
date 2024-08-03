import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";


/**
 * Performs a selection sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the selection sort.
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
 * Time complexity: O(n^2) - Selection sort has a quadratic time complexity.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Selection sort is a simple sorting algorithm that divides the input list into two parts: the sublist of items already sorted, 
 * which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy 
 * the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds 
 * by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the 
 * leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.
 * 
 * The algorithm works as follows:
 * 1. Iterate over the array from the first element to the last.
 * 2. For each element, find the minimum element in the remaining unsorted array.
 * 3. Swap the found minimum element with the first element of the unsorted array.
 * 4. Repeat steps 2-3 until the array is sorted.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = selectionSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = selectionSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function selectionSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;

    for (let i: number = 0; i < n; i++) {
        let min_index: number = i;

        for (let j: number = i + 1; j < n; j++) {
            if (compare(array[min_index], array[j]) > 0) {
                min_index = j;
            }
        }

        if (min_index !== i) {
            [array[i], array[min_index]] = [array[min_index], array[i]];
        }
    }
    return array;
}