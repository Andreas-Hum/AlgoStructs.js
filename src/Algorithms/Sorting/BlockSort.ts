import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";
import { quickSort} from "./QuickSort";
/**
 * Performs a block sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the block sort.
 * @param {T[]} options.array - The array to be sorted.
 * @param {(a: T, b: T) => number} options.compare - The comparison function.
 * @param {(options: SortOptions<T>) => T[]} [options.sortAlgorithm] - The sorting algorithm to use for sorting blocks.
 * @returns {T[]} - The sorted array.
 * 
 * @remarks
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * @complexity
 * Time complexity: O(n log n) - Block sort has a logarithmic time complexity.
 * Space complexity: O(n) - Block sort requires additional space proportional to the array size.
 * 
 * @description
 * Block sort is a hybrid sorting algorithm that divides the array into blocks, sorts each block using the specified sorting algorithm (default is quick sort), and then merges the blocks using a merge-like process.
 * 
 * The algorithm works as follows:
 * 1. Divide the array into blocks.
 * 2. Sort each block using the specified sorting algorithm.
 * 3. Merge the sorted blocks into a single sorted array.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = blockSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = blockSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function blockSort<T>({ array, compare, sortAlgorithm = quickSort }: SortOptions<T> & { sortAlgorithm?: (options: SortOptions<T>) => T[] }): T[] {
    const n: number = array.length;
    if (n <= 1) {
        return array;
    }

    const blockSize: number = Math.sqrt(n);
    const blocks: T[][] = [];

    for (let i: number = 0; i < n; i += blockSize) {
        const block: T[] = array.slice(i, i + blockSize);
        sortAlgorithm({ array: block, compare });
        blocks.push(block);
    }

    return mergeBlocks({ blocks, compare });
}


/**
 * Merges sorted blocks into a single sorted array.
 * 
 * @template T - The type of elements in the blocks.
 * @param {Object} options - The options for merging.
 * @param {T[][]} options.blocks - The sorted blocks.
 * @param {(a: T, b: T) => number} options.compare - The comparison function.
 * @returns {T[]} - The merged and sorted array.
 */
function mergeBlocks<T>({ blocks, compare }: { blocks: T[][], compare: (a: T, b: T) => number }): T[] {
    let result: T[] = [];
    for (const block of blocks) {
        result = merge({ left: result, right: block, compare });
    }
    return result;
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