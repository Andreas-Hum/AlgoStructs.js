export interface SortOptions<T> {
    array: T[];
    compare: (a: T, b: T) => number;
}

export interface MergeSortOptions<T> {
    left: T[];
    right: T[],
    compare: (a: T, b: T) => number;
}