



/**
 * Performs a Jump Search on a sorted array to find the index of a target element.
 * 
 * Jump Search is an algorithm for finding a target value within a sorted array.
 * It works by dividing the array into blocks of a fixed size and performing a linear search within the block where the target element is likely to be.
 * 
 * @template T - The type of elements in the array.
 * @param {T[]} array - The sorted array to search within.
 * @param {T} target - The target element to search for.
 * @param {(a: T, b: T) => number} compare - A comparison function that returns:
 *   - A negative number if `a` is less than `b`
 *   - Zero if `a` is equal to `b`
 *   - A positive number if `a` is greater than `b`
 * @returns {number} - The index of the target element in the array, or -1 if the target is not found.
 * 
 * @example
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber = 5;
 * const index = JumpSearch(numbers, targetNumber, (a, b) => a - b);
 * console.log(index); // Output: 4
 * 
 * @complexity
 * Time complexity: O(√n) - where n is the number of elements in the array.
 * Space complexity: O(1) - as it uses a constant amount of extra space.
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


