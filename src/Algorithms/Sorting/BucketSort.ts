import { NumericalOnlySortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";
import { insertionSort } from "./InsertionSort";

/**
 * Performs a bucket sort on an array of numbers.
 * 
 * @param {NumericalOnlySortOptions<number>} options - The options for the bucket sort.
 * @param {number[]} options.array - The array to be sorted.
 * @returns {number[]} - The sorted array.
 * 
 * @remarks
 * Bucket sort is a distribution sort that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm or recursively applying the bucket sort.
 * 
 * @complexity
 * Time complexity: O(n + k) - Where n is the number of elements and k is the number of buckets.
 * Space complexity: O(n + k) - Additional space for the buckets.
 * 
 * @description
 * Bucket sort works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually using insertion sort. Finally, the sorted buckets are concatenated to form the final sorted array.
 * 
 * @example
 * const numbers: number[] = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68];
 * const sortedNumbers: number[] = bucketSort({ array: numbers });
 * console.log(sortedNumbers); // Output: [0.12, 0.17, 0.21, 0.23, 0.26, 0.39, 0.68, 0.72, 0.78, 0.94]
 */
export function bucketSort({ array }: NumericalOnlySortOptions<number>): number[] {
    const n: number = array.length;
    if (n <= 0) return array;

    const minValue: number = Math.min(...array);
    const maxValue: number = Math.max(...array);

    const range: number = maxValue - minValue;

    if (range === 0) return array;

    const buckets: number[][] = Array.from({ length: n }, (): number[] => []);

    for (let i: number = 0; i < n; i++) {
        const normalizedValue: number = (array[i] - minValue) / range;
        const bi: number = Math.floor(normalizedValue * (n - 1));
        buckets[bi].push(array[i]);
    }

    for (let i: number = 0; i < n; i++) {
        insertionSort({ array: buckets[i], compare: (a: number, b: number) => a - b });
    }

    let index: number = 0;
    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < buckets[i].length; j++) {
            array[index++] = buckets[i][j];
        }
    }

    return array;
}