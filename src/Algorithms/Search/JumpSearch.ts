



/**
 * Performs a Jump Search on a sorted array to find the index of a target element.
 * 
 * @template T - The type of elements in the array.
 * @param {T[]} array - The sorted array to search within.
 * @param {T} target - The target element to search for.
 * @param {(a: T, b: T) => number} compare - A comparison function.
 * @returns {number} - The index of the target element in the array, or -1 if the target is not found.
 * 
 * @remark
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * @complexity
 * Time complexity: O(sqrt(n)) - Where n is the number of elements in the array.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * Jump Search is an algorithm for finding a target value within a sorted array.
 * It works by dividing the array into blocks of a fixed size and performing a linear search within the block where the target element is likely to be.
 * 
 * The algorithm works as follows:
 * 1. Determine the block size to be jumped. This is typically the square root of the array's length.
 * 2. Jump ahead by the block size until the target element is greater than the current element or the end of the array is reached.
 * 3. Perform a linear search within the identified block to find the target element.
 * 4. If the target element is found, return its index. Otherwise, return -1.
 *  
 * @example
 * const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber: number = 5;
 * const index: number = JumpSearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * 
 * @example
 * // For strings
 * const strings: string[] = ["apple", "banana", "cherry", "date"];
 * const targetString: string = "cherry";
 * const index: number = JumpSearch(strings, targetString, (a, b) => a.localeCompare(b));
 * console.log(index); // Output: 2
 * 
 */
export default function JumpSearch<T>(array: T[], target: T, compare: (a: T, b: T) => number): number {

    const n: number = array.length
    let prev: number = 0;
    let step: number = Math.floor(Math.sqrt(n))

    while (compare(array[Math.min(step, n) - 1], target) < 0) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1
        }
    }

    while (compare(array[prev], target) < 0) {
        prev++;
        if (prev === Math.min(step, n)) {
            return -1;
        }
    }

    if (compare(array[prev], target) === 0) {
        return prev;
    } else {
        return -1;
    }

}


