export default interface SearchOptions<T> {
    /**
     * The sorted array to search.
     */
    array: T[];

    /**
     * The element to search for.
     */
    target: T;

    /**
     * The comparison function.
     * @param a - The first element to compare.
     * @param b - The second element to compare.
     * @returns A negative number if the first argument is less than the second.
     *          Zero if the first argument is equal to the second.
     *          A positive number if the first argument is greater than the second.
     */
    compare: (a: T, b: T) => number;
}
