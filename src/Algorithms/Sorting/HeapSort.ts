import { SortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";

/**
 * Performs a heap sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the heap sort.
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
 * Time complexity: O(n log n) - Heap sort has a logarithmic time complexity.
 * Space complexity: O(1) - Heap sort is an in-place sorting algorithm.
 * 
 * @description
 * Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.
 * 
 * The algorithm works as follows:
 * 1. Build a max heap from the input data.
 * 2. At this point, the largest item is stored at the root of the heap. Replace it with the last item of the heap followed by reducing the size of the heap by one. Finally, heapify the root of the tree.
 * 3. Repeat step 2 while the size of the heap is greater than 1.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = heapSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = heapSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function heapSort<T>({ array, compare }: SortOptions<T>): T[] {

    /**
     * Heapifies a subtree rooted with node i which is an index in array[].
     * 
     * @param {T[]} array - The array to be heapified.
     * @param {number} n - The size of the heap.
     * @param {number} i - The index of the root element of the subtree.
     */
    const heapify: (array: T[], n: number, i: number) => void = (array: T[], n: number, i: number): void => {
        let largest: number = i;
        const left: number = 2 * i + 1;
        const right: number = 2 * i + 2;

        if (left < n && compare(array[left], array[largest]) > 0) {
            largest = left;
        }

        if (right < n && compare(array[right], array[largest]) > 0) {
            largest = right;
        }

        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            heapify(array, n, largest);
        }
    };

    /**
     * Main function to perform heap sort.
     * 
     * @param {T[]} array - The array to be sorted.
     */
    const heap_sort: (array: T[]) => void = (array: T[]): void => {
        const n: number = array.length;

        for (let i: number = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(array, n, i);
        }

        for (let i: number = n - 1; i > 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
            heapify(array, i, 0);
        }
    };

    heap_sort(array);
    return array;
}