import SearchOptions from "../../Options/AlgorithmOptions/SearchOptions/SearchOptions";


/**
 * Performs a linear search on an array.
 * 
 * @template T - The type of elements in the array.
 * @param {SearchOptions<T>} options - The options for the linear search.
 * @param {T[]} options.array - The array to search.
 * @param {T} options.target - The element to search for.
 * @param {(a: T, b: T) => number} options.compare - The comparison function.
 * @returns {number} - The index of the target element, or -1 if not found.
 * 
 * @remarks
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * @complexity
 * Time complexity: O(n) - where n is the number of elements in the array.
 * Space complexity: O(1) - We use a constant amount of space.
 * 
 * @description
 * This function performs a linear search, which means it checks each element of the array one by one.
 * It starts from the first element and compares it with the target element using the provided comparison function.
 * If the comparison function returns zero, it means the target element is found, and the function returns the index of that element.
 * If the target element is not found after checking all elements, the function returns -1.
 * 
 * @example
 * // For numbers
 * const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const targetNumber: number = 5;
 * const index: number = linearSearch({ array: numbers, target: targetNumber, compare: (a, b) => a - b });
 * console.log(index); // Output: 4
 * 
 * @example
 * // For strings
 * const strings: string[] = ["apple", "banana", "cherry", "date"];
 * const targetString: string = "cherry";
 * const index: number = linearSearch({ array: strings, target: targetString, compare: (a, b) => a.localeCompare(b) });
 * console.log(index); // Output: 2
 */
export function linearSearch<T>({ array, target, compare }: SearchOptions<T>): number {
    const n: number = array.length;

    for (let i: number = 0; i < n; i++) {
        if (compare(array[i], target) === 0) {
            return i;
        }
    }

    return -1;
}