import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";

/**
 * Performs a quick sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the quick sort.
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
 * Time complexity: O(n log n) - Quick sort has a logarithmic average-case time complexity but O(n^2) in the worst case.
 * Space complexity: O(log n) - Quick sort requires additional space for recursion.
 * 
 * @description
 * Quick sort is a highly efficient sorting algorithm and is based on partitioning the array of data into smaller arrays. A large array is partitioned into two arrays, one of which holds values smaller than the specified value, say pivot, based on which the partition is made, and another array holds values greater than the pivot value.
 * 
 * The algorithm works as follows:
 * 1. Pick an element from the array, called a pivot.
 * 2. Partition the array into two sub-arrays: elements less than the pivot and elements greater than the pivot.
 * 3. Recursively sort the sub-arrays.
 * 4. Combine the sorted sub-arrays and the pivot to get the sorted array.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = quickSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = quickSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function quickSort<T>({ array, compare }: SortOptions<T>): T[] {

    /**
     * Partitions the array into two parts, with elements less than or equal to the pivot on the left and elements greater than the pivot on the right.
     * 
     * @param {T[]} array - The array to be partitioned.
     * @param {number} low - The starting index of the array segment to be partitioned.
     * @param {number} high - The ending index of the array segment to be partitioned.
     * @returns {number} - The partition index.
     */
    const partition: (array: T[], low: number, high: number) => number = (array: T[], low: number, high: number): number => {
        const middle: number = Math.floor((low + high) / 2);
        const medianIndex: number = [low, middle, high].sort((a, b) => compare(array[a], array[b]))[1];
        [array[medianIndex], array[high]] = [array[high], array[medianIndex]];

        const pivot: T = array[high];
        let i: number = low - 1;

        for (let j: number = low; j < high; j++) {
            if (compare(array[j], pivot) <= 0) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        return i + 1;
    };

    /**
     * Recursively sorts the array using quick sort algorithm.
     * 
     * @param {T[]} array - The array to be sorted.
     * @param {number} low - The starting index of the array segment to be sorted.
     * @param {number} high - The ending index of the array segment to be sorted.
     */
    const quick_sort: (array: T[], low: number, high: number) => void = (array: T[], low: number, high: number): void => {
        if (low < high) {
            const pi: number = partition(array, low, high);
            quick_sort(array, low, pi - 1);
            quick_sort(array, pi + 1, high);
        }
    };

    quick_sort(array, 0, array.length - 1);
    return array;
}
