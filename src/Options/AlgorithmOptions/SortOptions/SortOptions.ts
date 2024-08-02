export interface SortOptions<T> {
    array: T[];
    compare: (a: T, b: T) => number;
}