import { NumericalOnlySortOptions } from "../../Options/AlgorithmOptions/SortOptions/SortOptions";

/**
 * Performs a counting sort on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {NumericalOnlySortOptions<number>} options - The options for the counting sort.
 * @param {number[]} options.array - The array to be sorted.
 * @param {(a: number, b: number) => number} options.compare - The comparison function.
 * @returns {number[]} - The sorted array.
 * 
 * @remarks
 * Counting sort is typically used for sorting integers. The comparison function is not used in this implementation as counting sort does not require comparisons.
 * 
 * @complexity
 * Time complexity: O(n + k) - Counting sort has a linear time complexity, where n is the number of elements and k is the range of the input.
 * Space complexity: O(n + k) - Counting sort requires additional space proportional to the array size and the range of the input.
 * 
 * @description
 * Counting sort is an integer sorting algorithm that works by counting the number of occurrences of each unique element in the input array. It then uses this count to determine the position of each element in the sorted array.
 * 
 * The algorithm works as follows:
 * 1. Find the maximum value in the input array.
 * 2. Create a count array to store the count of each unique element.
 * 3. Populate the count array with the number of occurrences of each element.
 * 4. Modify the count array by adding the previous counts to get the positions of elements in the sorted array.
 * 5. Build the sorted array by placing elements at their correct positions.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [5, 3, 8, 4, 2];
 * const sortedNumbers: number[] = countingSort({ array: numbers, compare: (a, b) => a - b });
 * console.log(sortedNumbers); // Output: [2, 3, 4, 5, 8]
 */
export function countingSort({ array }: NumericalOnlySortOptions<number>): number[] {
    const n: number = array.length;
    if (n <= 1) {
        return array;
    }

    const max: number = Math.max(...array);
    const min: number = Math.min(...array);
    const range: number = max - min + 1;

    const count: number[] = new Array(range).fill(0);

    for (const num of array) {
        count[num - min]++;
    }

    for (let i: number = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    const sortedArray: number[] = new Array(n);
    for (let i: number = n - 1; i >= 0; i--) {
        sortedArray[count[array[i] - min] - 1] = array[i];
        count[array[i] - min]--;
    }

    return sortedArray;
}