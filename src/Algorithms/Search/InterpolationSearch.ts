import SearchOptions from "../../Options/AlgorithmOptions/SearchOptions/SearchOptions";

/**
 * Performs an interpolation search on a sorted array. Very useful for data uniformly spread.
 * 
 * @template T - The type of elements in the array.
 * @param {SearchOptions<T>} options - The options for the interpolation search.
 * @param {T[]} options.array - The sorted array to search.
 * @param {T} options.target - The element to search for.
 * @param {(a: T, b: T) => number} options.compare - The comparison function.
 * @returns {number} - The index of the target element, or -1 if not found.
 * @remark
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * @complexity
 * Time complexity: O(log(log n)) - For uniformly distributed data, the time complexity is very efficient.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * This function uses interpolation search, which is an improvement over binary search for uniformly distributed data.
 * It estimates the position of the target element based on the values at the low and high indices.
 * The position is calculated using the formula:
 * 
 * pos = low + ((high - low) / (array[high] - array[low])) * (target - array[low])
 * 
 * This formula assumes that the data is uniformly distributed and uses the ratio of the differences to estimate the position.
 * The search continues by adjusting the low and high indices based on the comparison of the target with the estimated position.
 * If the target is found, its index is returned. If the target is not found, -1 is returned.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber: number  = 5;
 * const index: number  = interpolationSearch({ array: numbers, target: targetNumber, compare: (a, b) => a - b });
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings: string[] = ["apple", "banana", "cherry", "date"];
 * const targetString: string = "cherry";
 * const index: number = interpolationSearch({ array: strings, target: targetString, compare: (a, b) => a.localeCompare(b) });
 * console.log(index); // Output: 2
 */
export function interpolationSearch<T>({ array, target, compare }: SearchOptions<T>): number {
    let low: number = 0;
    let high: number = array.length - 1;

    while (low <= high && compare(target, array[low]) >= 0 && compare(target, array[high]) <= 0) {
        if (low === high) {
            if (compare(array[low], target) === 0) return low;
            return -1;
        }

        let pos = low + Math.floor(((high - low) / (compare(array[high], array[low]))) * compare(target, array[low]));

        if (compare(array[pos], target) === 0) {
            return pos;
        }

        if (compare(array[pos], target) < 0) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}