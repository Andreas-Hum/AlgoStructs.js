import { SortOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a shell sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the shell sort.
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
 * Time complexity: O(n log^2 n) - in the worst case because of the chosen gap sequence.
 * Space complexity: O(1) - Shell sort is an in-place sorting algorithm.
 * 
 * @description
 * Shell sort is an optimization of insertion sort that allows the exchange of items that are far apart. The gap sequence used in this implementation is the Ciura gap sequence, which has been experimentally derived.
 * 
 * The algorithm works as follows:
 * 1. Initialize the gap sequence.
 * 2. For each gap, perform a gapped insertion sort.
 * 3. Reduce the gap and repeat until the gap is 1.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = shellSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = shellSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function shellSort<T>({ array, compare }: SortOptions<T>): T[] {
    const n: number = array.length;
    const gaps: number[] = [701, 301, 132, 57, 23, 10, 4, 1];  // Ciura gap sequence, it has been experimentally derived

    for (const gap of gaps) {
        for (let i = gap; i < n; i++) {
            let temp: T = array[i];
            let j: number = i;
            for (j; j >= gap && compare(array[j - gap], temp) > 0; j -= gap) {
                [array[j], array[j - gap]] = [array[j - gap], array[j]];
            }
            array[j] = temp;
        }
    }
    return array;
}