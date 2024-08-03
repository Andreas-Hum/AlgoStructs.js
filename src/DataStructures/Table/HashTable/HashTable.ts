/**
 * Represents a hash table.
 * @template K - The type of the key.
 * @template V - The type of the value.
 */
export class HashTable<K, V> {
    private _toNumber: (key: K) => number;
    private _size: number;
    private _table: Array<Array<[K, V]>>;
    private _count: number;
    private _loadFactor: number;

    /**
     * Creates an instance of a hash table.
     * 
     * @param {(key: K) => number} toNumber - A function to convert the key to a number.
     * @remark
     * The `toNumber` function should return:
     * - A unique number for each unique key.
     * 
     * @example
     * const toNumber: (key: string) => number = (key: string) => {
     *     let sum: number = 0;
     *     for (let i: number = 0; i < key.length; i++) {
     *         sum += key.charCodeAt(i);
     *     }
     *     return sum;
     * };
     * const hashTable: HashTable<string, number> = new HashTable<string, number>({ size: 10, toNumber });
     */
    constructor(options: { size: number, toNumber: (key: K) => number }) {
        this._size = options.size;
        this._toNumber = options.toNumber;
        this._table = new Array(options.size).fill(null).map(() => []);
        this._count = 0;
        this._loadFactor = 0.75;
    }

    /**
     * Generates a hash for the given key.
     * @param {K} key - The key to hash.
     * @returns {number} - The hash value.
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    private hash(key: K): number {
        return this._toNumber(key) % this._size;
    }

    /**
     * Rehashes the hash table to a new size.
     * @param {number} newSize - The new size of the hash table.
     * @complexity
     * Time complexity: O(n) - Where n is the number of key-value pairs in the hash table.
     * Space complexity: O(n) - Where n is the number of key-value pairs in the hash table.
     */
    private rehash(newSize: number): void {
        const oldTable = this._table;
        this._size = newSize;
        this._table = new Array(this._size).fill(null).map(() => []);
        this._count = 0;

        for (const bucket of oldTable) {
            for (const [key, value] of bucket) {
                this.put(key, value);
            }
        }
    }

    /**
     * Inserts a key-value pair into the hash table.
     * @param {K} key - The key to insert.
     * @param {V} value - The value to insert.
     * @complexity
     * Time complexity: O(1) - on average, O(n) in the worst case due to collisions.
     * Space complexity: O(1) - Constant space operation.
     */
    public put(key: K, value: V): void {
        if (this._count / this._size > this._loadFactor) {
            this.rehash(this._size * 2);
        }

        const index = this.hash(key);
        const bucket = this._table[index];

        for (let i = 0; i < bucket.length; i++) {
            if (this._toNumber(bucket[i][0]) === this._toNumber(key)) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this._count++;
    }

    /**
     * Retrieves the value associated with the given key.
     * @param {K} key - The key to retrieve.
     * @returns {V | null} - The value associated with the key, or null if not found.
     * @complexity
     * Time complexity: O(1) - on average, O(n) in the worst case due to collisions.
     * Space complexity: O(1) - Constant space operation.
     */
    public get(key: K): V | null {
        const index = this.hash(key);
        const bucket = this._table[index];

        for (const [k, v] of bucket) {
            if (this._toNumber(k) === this._toNumber(key)) {
                return v;
            }
        }

        return null;
    }

    /**
     * Removes the key-value pair associated with the given key.
     * @param {K} key - The key to remove.
     * @complexity
     * Time complexity: O(1) - on average, O(n) in the worst case due to collisions.
     * Space complexity: O(1) - Constant space operation.
     */
    public remove(key: K): void {
        const index = this.hash(key);
        const bucket = this._table[index];

        for (let i = 0; i < bucket.length; i++) {
            if (this._toNumber(bucket[i][0]) === this._toNumber(key)) {
                bucket.splice(i, 1);
                this._count--;
                return;
            }
        }
    }

    /**
     * Checks if the hash table contains the given key.
     * @param {K} key - The key to check.
     * @returns {boolean} - True if the key exists, false otherwise.
     * @complexity
     * Time complexity: O(1) - on average, O(n) in the worst case due to collisions.
     * Space complexity: O(1) - Constant space operation.
     */
    public containsKey(key: K): boolean {
        return this.get(key) !== null;
    }

    /**
     * Returns an array of all keys in the hash table.
     * @returns {K[]} - An array of all keys.
     * @complexity
     * Time complexity: O(n) - where n is the number of key-value pairs in the hash table.
     * Space complexity: O(n) - where n is the number of key-value pairs in the hash table.
     */
    public getKeys(): K[] {
        return this._table.flatMap(bucket => bucket.map(([k, _]) => k));
    }

    /**
     * Returns an array of all values in the hash table.
     * @returns {V[]} - An array of all values.
     * @complexity
     * Time complexity: O(n) - where n is the number of key-value pairs in the hash table.
     * Space complexity: O(n) - where n is the number of key-value pairs in the hash table.
     */
    public getValues(): V[] {
        return this._table.flatMap(bucket => bucket.map(([_, v]) => v));
    }

    /**
     * Clears all entries in the hash table.
     * @complexity
     * Time complexity: O(n) - Where n is the size of the hash table.
     * Space complexity: O(1) - Constant space operation.
     */
    public clear(): void {
        this._table = new Array(this._size).fill(null).map(() => []);
        this._count = 0;
    }

    /**
     * Returns the number of key-value pairs in the hash table.
     * @returns {number} - The number of key-value pairs.
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    public getSize(): number {
        return this._count;
    }

    /**
     * Returns the load factor of the hash table.
     * @returns {number} - The load factor.
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    public getLoadFactor(): number {
        return this._count / this._size;
    }

    /**
     * Provides a string representation of the hash table.
     * @returns {string} - The string representation.
     * @complexity
     * Time complexity: O(n) - Where n is the number of key-value pairs in the hash table.
     * Space complexity: O(n) - Where n is the number of key-value pairs in the hash table.
     */
    public toString(): string {
        let result = '';
        for (let i = 0; i < this._size; i++) {
            result += `[${i}]: `;
            result += this._table[i].map(([k, v]) => `{${k}: ${v}}`).join(' -> ');
            result += ' -> null\n';
        }
        return result;
    }

    /**
     * Implements the iterable interface for the hash table.
     * @returns {IterableIterator<[K, V]>} - An iterator for the hash table.
     * @complexity
     * Time complexity: O(n) - Where n is the number of key-value pairs in the hash table.
     * Space complexity: O(1) - Constant space operation.
     */
    *[Symbol.iterator](): IterableIterator<[K, V]> {
        for (const bucket of this._table) {
            for (const [key, value] of bucket) {
                yield [key, value];
            }
        }
    }
}