/**
 * Represents a hash table data structure.
 * 
 * @template K - The type of the keys in the hash table.
 * @template V - The type of the values in the hash table.
 * 
 * @param {Object} options - The initialization options for the hash table.
 * @param {number} options.size - The size of the hash table.
 * @param {(key: K) => number} options.toNumber - Function to convert keys to numbers.
 * 
 * @description
 * A hash table, also known as a hash map, is a data structure that implements an associative array abstract data type, a structure that can map keys to values. 
 * A hash table uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
 * 
 * This implementation uses separate chaining to resolve collisions, where each bucket is an array that can hold multiple key-value pairs.
 * 
 * The algorithm works as follows:
 * 1. The `put` method hashes the key and stores the value in the corresponding bucket.
 * 2. The `get` method hashes the key and retrieves the value from the corresponding bucket.
 * 3. The `remove` method hashes the key and removes the key-value pair from the corresponding bucket.
 * 4. The `containsKey` method checks if a key is in the hash table.
 * 5. The `getKeys` method returns an array of all the keys in the hash table.
 * 6. The `getValues` method returns an array of all the values in the hash table.
 * 7. The `clear` method removes all elements from the hash table.
 * 8. The `getSize` method returns the number of elements in the hash table.
 * 9. The `toString` method returns a string representation of the hash table.
 * 10. The `iteratorGenerator` method returns an iterator for the hash table.
 * 
 * @example
 * // Create a new hash table
 * const hashTable = new HashTable<string, number>({ size: 10, toNumber: stringToKey });
 * 
 * // Add elements to the hash table
 * hashTable.put("key1", 1);
 * hashTable.put("key2", 2);
 * 
 * // Retrieve elements from the hash table
 * console.log(hashTable.get("key1")); // Output: 1
 * 
 * // Remove an element from the hash table
 * hashTable.remove("key1");
 * console.log(hashTable.get("key1")); // Output: undefined
 * 
 * // Check if a key is in the hash table
 * console.log(hashTable.containsKey("key2")); // Output: true
 * 
 * // Get all keys in the hash table
 * console.log(hashTable.getKeys()); // Output: ["key2"]
 * 
 * // Get all values in the hash table
 * console.log(hashTable.getValues()); // Output: [2]
 * 
 * // Clear the hash table
 * hashTable.clear();
 * console.log(hashTable.getSize()); // Output: 0
 * 
 * @complexity
 * Time complexity: O(1) on average for put, get, and remove operations, assuming a good hash function and a low load factor.
 * Space complexity: O(n), where n is the number of elements in the hash table.
 */
export class HashTable<K, V> {
    private _toNumber: (key: K) => number;
    private _size: number;
    private _table: Array<Array<[K, V]>>;
    private _count: number;

    /**
     * Initializes a new instance of the HashTable class.
     * @param {Object} options - The initialization options.
     * @param {number} options.size - The size of the hash table.
     * @param {(key: K) => number} options.toNumber - Function to convert keys to numbers.
     */
    constructor(options: { size: number; toNumber: (key: K) => number }) {
        this._size = options.size;
        this._toNumber = options.toNumber;
        this._table = Array.from({ length: options.size }, () => [] as Array<[K, V]>);
        this._count = 0;
    }

    /**
     * Hashes the key to an index in the table.
     * @param {K} key - The key to hash.
     * @returns {number} - The index in the table.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    private hash(key: K): number {
        return Math.abs(this._toNumber(key) % this._size);
    }

    /**
     * Adds or updates an element with a specified key and value.
     * @param {K} key - The key of the element to add.
     * @param {V} value - The value of the element to add.
     * 
     * @complexity
     * Time complexity: O(1) on average - Adding or updating a key-value pair is constant time on average.
     * Space complexity: O(1) - TConstant space operation.
     */
    put(key: K, value: V): void {
        const index: number = this.hash(key);
        const bucket: Array<[K, V]> = this._table[index];
        for (let i: number = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this._count++;
    }

    /**
     * Gets the value associated with a specified key.
     * @param {K} key - The key of the element to get.
     * @returns {V | undefined} - The value associated with the key, or undefined if the key doesn't exist.
     * 
     * @complexity
     * Time complexity: O(1) on average - Retrieving a value is constant time on average.
     * Space complexity: O(1) - Constant space operation.
     */
    get(key: K): V | undefined {
        const index: number = this.hash(key);
        const bucket: Array<[K, V]> = this._table[index];
        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }
        return undefined;
    }

    /**
     * Removes an element with a specified key.
     * @param {K} key - The key of the element to remove.
     * 
     * @complexity
     * Time complexity: O(1) on average - Removing a key-value pair is constant time on average.
     * Space complexity: O(1) - Constant space operation.
     */
    remove(key: K): void {
        const index: number = this.hash(key);
        const bucket: Array<[K, V]> = this._table[index];
        for (let i: number = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this._count--;
                return;
            }
        }
    }

    /**
     * Determines whether the hash table contains the specified key.
     * @param {K} key - The key to locate in the hash table.
     * @returns {boolean} - true if the hash table contains an element with the specified key; otherwise, false.
     * 
     * @complexity
     * Time complexity: O(1) on average - Checking for the presence of a key is constant time on average.
     * Space complexity: O(1) - Constant space operation.
     */
    containsKey(key: K): boolean {
        return this.get(key) !== undefined;
    }

    /**
     * Gets an array of all the keys in the hash table.
     * @returns {K[]} - An array of all the keys in the hash table.
     * 
     * @complexity
     * Time complexity: O(n) - Collecting all keys requires iterating over all elements.
     * Space complexity: O(n) - Storing all keys requires space proportional to the number of elements.
     */
    getKeys(): K[] {
        const keys: K[] = [];
        for (const bucket of this._table) {
            for (const [key] of bucket) {
                keys.push(key);
            }
        }
        return keys;
    }

    /**
     * Gets an array of all the values in the hash table.
     * @returns {V[]} - An array of all the values in the hash table.
     * 
     * @complexity
     * Time complexity: O(n) - Collecting all values requires iterating over all elements.
     * Space complexity: O(n) - Storing all values requires space proportional to the number of elements.
     */
    getValues(): V[] {
        const values: V[] = [];
        for (const bucket of this._table) {
            for (const [, value] of bucket) {
                values.push(value);
            }
        }
        return values;
    }

    /**
     * Removes all elements from the hash table.
     * 
     * @complexity
     * Time complexity: O(n) - Clearing the table requires iterating over all elements.
     * Space complexity: O(n) - The space is freed, but the method itself uses constant space.
     */
    clear(): void {
        this._table = Array.from({ length: this._size }, () => [] as Array<[K, V]>);
        this._count = 0;
    }

    /**
     * Gets the number of elements in the hash table.
     * @returns {number} - The number of elements in the hash table.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    getSize(): number {
        return this._count;
    }

    /**
     * Returns a string representation of the hash table.
     * @returns {string} - A string representation of the hash table.
     * 
     * @complexity
     * Time complexity: O(n) - Generating the string requires iterating over all elements.
     * Space complexity: O(n) - Storing the string representation requires space proportional to the number of elements.
     */
    toString(): string {
        const items: string[] = [];
        for (const bucket of this._table) {
            for (const [key, value] of bucket) {
                items.push(`${key}: ${value}`);
            }
        }
        return `{ ${items.join(', ')} }`;
    }

    /**
     * Generates an iterator for the hash table.
     * @returns {IterableIterator<[K, V]>} - An iterator for the hash table.
     * 
     * @complexity
     * Time complexity: O(n) - Iterating over all elements requires visiting each element once.
     * Space complexity: O(1) - Constant space operation.
     */
    *iteratorGenerator(): IterableIterator<[K, V]> {
        for (const bucket of this._table) {
            for (const [key, value] of bucket) {
                yield [key, value];
            }
        }
    }
}