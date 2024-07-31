/**
 * Performs an interpolation search on a sorted array. Very usefull for data uniformly spread
 * 
 * @template T - The type of elements in the array.
 * @param {T[]} array - The sorted array to search.
 * @param {T} target - The element to search for.
 * @param {(a: T, b: T) => number} compare - The comparison function.
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
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber = 5;
 * const index = interpolationSearch(numbers, targetNumber, compareNumbers);
 * console.log(index); // Output: 4
 * 
 * // For strings
 * const strings = ["apple", "banana", "cherry", "date"];
 * const targetString = "cherry";
 * const index = interpolationSearch(strings, targetString, compareStrings);
 * console.log(index); // Output: 2
 * 
 * // For objects
 * const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * const targetObject = { value: 2 };
 * const index = interpolationSearch(objects, targetObject, compareObjects);
 * console.log(index); // Output: 1
 */
export default function interpolationSearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {
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
        }
        else {
            high = pos - 1;
        }
    }
    return -1;
}
