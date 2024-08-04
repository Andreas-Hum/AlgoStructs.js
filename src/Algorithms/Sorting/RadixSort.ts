import { NumericalOnlySortOptions } from "../../Options/AlgorithmOptions";

/**
 * Performs a radix sort on an array of numbers.
 * 
 * @param {NumericalOnlySortOptions<number>} options - The options for the radix sort.
 * @param {number[]} options.array - The array to be sorted.
 * @returns {number[]} - The sorted array.
 * 
 * @remarks
 * The comparison function is not used in radix sort as it is a non-comparative sorting algorithm.
 * 
 * @complexity
 * Time complexity: O(d * (n + k)) - Where d is the number of digits in the largest number, n is the number of elements, and k is the range of the digits (0-9).
 * Space complexity: O(n + k) - Additional space for the counting sort.
 * 
 * @description
 * Radix sort processes each digit of the numbers starting from the least significant digit to the most significant digit. It uses counting sort as a subroutine to sort the digits.
 * 
 * @example
 * const numbers: number[] = [170, 45, 75, 90, 802, 24, 2, 66];
 * const sortedNumbers: number[] = radixSort({ array: numbers });
 * console.log(sortedNumbers); // Output: [2, 24, 45, 66, 75, 90, 170, 802]
 */
export function radixSort({ array }: NumericalOnlySortOptions<number>): number[] {
    if (array.some(num => num < 0)) {
        throw new Error("Radix sort does not support negative numbers.");
    }

    const getMax: (arr: number[]) => number = (arr: number[]): number => {
        let max: number = arr[0];
        for (let i: number = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    };

    const countingSort: (arr: number[], exp: number) => void = (arr: number[], exp: number): void => {
        const n: number = arr.length;
        const output: number[] = new Array(n).fill(0);
        const count: number[] = new Array(10).fill(0);

        for (let i: number = 0; i < n; i++) {
            const index: number = Math.floor(arr[i] / exp) % 10;
            count[index]++;
        }

        for (let i: number = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i: number = n - 1; i >= 0; i--) {
            const index: number = Math.floor(arr[i] / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }

        for (let i: number = 0; i < n; i++) {
            arr[i] = output[i];
        }
    };

    const max: number = getMax(array);

    for (let exp: number = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(array, exp);
    }

    return array;
}