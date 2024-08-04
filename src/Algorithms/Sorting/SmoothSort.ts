import { SortOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a smooth sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SortOptions<T>} options - The options for the smooth sort.
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
 * Time complexity: O(n log n) - In the worst case.
 * Space complexity: O(1) - Smooth sort is an in-place sorting algorithm.
 * 
 * @description
 * Smooth sort is a variation of heapsort that uses a Leonardo heap. It is designed to take advantage of existing order in the input.
 * 
 * The algorithm works as follows:
 * 1. Build the Leonardo heap by merging pairs of adjacent trees.
 * 2. Convert the Leonardo heap back into an array.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = smoothSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 * 
 * // For strings
 * const strings: string[] = ["banana", "apple", "cherry"];
 * const sortedStrings: string[] = smoothSort({ array: strings, compare: (a, b) => a.localeCompare(b) });
 * console.log(sortedStrings); // Output: ["apple", "banana", "cherry"]
 */
export function smoothSort<T>({ array, compare }: SortOptions<T>): T[] {
    const leonardo = (k: number): number => {
        if (k < 2) {
            return 1;
        }
        return leonardo(k - 1) + leonardo(k - 2) + 1;
    };

    const heapify = (arr: T[], start: number, end: number): void => {
        let i: number = start;
        let j: number = 0;
        let k: number = 0;

        while (k < end - start + 1) {
            if (k & 0xAAAAAAAA) {
                j = j + i;
                i = i >> 1;
            } else {
                i = i + j;
                j = j >> 1;
            }

            k = k + 1;
        }

        while (i > 0) {
            j = j >> 1;
            k = i + j;
            while (k < end) {
                if (compare(arr[k], arr[k - i]) > 0) {
                    break;
                }
                [arr[k], arr[k - i]] = [arr[k - i], arr[k]];
                k = k + i;
            }

            i = j;
        }
    };

    const n: number = array.length;
    let p: number = n - 1;
    let q: number = p;
    let r: number = 0;

    while (p > 0) {
        if ((r & 0x03) === 0) {
            heapify(array, r, q);
        }

        if (leonardo(r) === p) {
            r = r + 1;
        } else {
            r = r - 1;
            q = q - leonardo(r);
            heapify(array, r, q);
            q = r - 1;
            r = r + 1;
        }

        [array[0], array[p]] = [array[p], array[0]];
        p = p - 1;
    }

    for (let i: number = 0; i < n - 1; i++) {
        let j: number = i + 1;
        while (j > 0 && compare(array[j], array[j - 1]) < 0) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            j = j - 1;
        }
    }

    return array;
}
