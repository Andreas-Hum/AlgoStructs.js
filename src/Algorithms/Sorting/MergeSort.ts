import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";

/**
 * Performs a merge sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the merge sort.
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
 * Time complexity: O(n log n) - Merge sort has a logarithmic time complexity.
 * Space complexity: O(n) - Merge sort requires additional space proportional to the array size.
 * 
 * @description
 * Merge sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts each half, and then merges the sorted halves to produce the final sorted array.
 * 
 * The algorithm works as follows:
 * 1. If the array has one or zero elements, it is already sorted. Return it.
 * 2. Divide the array into two halves.
 * 3. Recursively sort each half.
 * 4. Merge the two sorted halves into a single sorted array.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = mergeSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = mergeSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function mergeSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;
    if (n <= 1) {
        return array;
    }

    let left_subarray: T[] = [];
    let right_subarray: T[] = [];

    let i: number = 0;

    for (const x of array) {
        if (i < Math.floor(n / 2)) {
            left_subarray.push(x);
        } else {
            right_subarray.push(x);
        }
        i++;
    }

    left_subarray = mergeSort({ array: left_subarray, compare });
    right_subarray = mergeSort({ array: right_subarray, compare });

    return merge({ left: left_subarray, right: right_subarray, compare });
}

/**
 * Merges two sorted arrays into a single sorted array.
 * 
 * @template T - The type of elements in the arrays.
 * @param {Object} options - The options for merging.
 * @param {T[]} options.left - The left sorted array.
 * @param {T[]} options.right - The right sorted array.
 * @param {(a: T, b: T) => number} options.compare - The comparison function.
 * @returns {T[]} - The merged and sorted array.
 * 
 * @remarks
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * @example
 * // For numbers
 * const left: number[] = [2, 4];
 * const right: number[] = [3, 5];
 * const merged: number[] = merge({ left, right, compare: (a, b) => a - b });
 * console.log(merged); // Output: [2, 3, 4, 5]
 * 
 * // For strings
 * const leftStrings: string[] = ["apple", "cherry"];
 * const rightStrings: string[] = ["banana"];
 * const mergedStrings: string[] = merge({ left: leftStrings, right: rightStrings, compare: (a, b) => a.localeCompare(b) });
 * console.log(mergedStrings); // Output: ["apple", "banana", "cherry"]
 */
function merge<T>({ left, right, compare }: { left: T[], right: T[], compare: (a: T, b: T) => number }): T[] {
    let result: T[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (compare(left[i], right[j]) <= 0) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}