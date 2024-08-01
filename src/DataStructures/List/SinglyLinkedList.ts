import Node from "./SinglyLinkedListNode"

/**
 * A class representing a singly linked list.
 * @template T The type of elements in the linked list.
 */
export default class LinkedList<T> {
    private _head: Node<T> | null;
    private _size: number;
    private _compare: (a: T, b: T) => number;

    /**
     * Creates an instance of LinkedList.
     * @param {(a: T, b: T) => number} compare - The comparison function.
     * @remarks
     * The comparison function should return:
     * - A negative number if the first argument is less than the second.
     * - Zero if the first argument is equal to the second.
     * - A positive number if the first argument is greater than the second.
     * 
     * @example
     * const compareNumbers: (a: number, b: number) => number = (a: number, b: number) => a - b;
     * const LinkedList: LinkedList<number> = new LinkedList<number>(compareNumbers);
     */
    constructor(compare: (a: T, b: T) => number) {
        this._head = null;
        this._size = 0;
        this._compare = compare;
    }

    /**
     * Adds one or more values to the end of the linked list.
     * @param {...T[]} values The values to add.
     * @returns {number} The new size of the linked list.
     * @complexity
     * Time complexity: O(n) - For each value added, where n is the number of elements in the list.
     * Space complexity: O(1) - For each value added.
     */
    public add(...values: T[]): number {
        if (values.length === 0) {
            return this._size;
        }

        for (const value of values) {
            const new_node = new Node(value);

            if (this._size === 0) {
                this._head = new_node;
            } else {
                let current: Node<T> = this._head as Node<T>;
                while (current.getNext() !== null) {
                    current = current.getNext() as Node<T>;
                }
                current.setNext(new_node);
            }

            this._size++;
        }

        return this._size;
    }

    /**
     * Removes the first occurrence of the specified value from the linked list.
     * @param {T} value The value to remove.
     * @returns {T | null} The removed value, or null if the value was not found.
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the list.
     * Space complexity: O(1) - Constant space operation
     */
    public remove(value: T): T | null {
        if (this._head === null) {
            return null;
        } else if (this._compare(this._head.get(), value) === 0) {
            const removed_value: T = this._head.get();
            this._head = this._head.getNext();
            this._size--;
            return removed_value;
        }

        let current: Node<T> | null = this._head.getNext();
        let prev: Node<T> = this._head;

        while (current !== null) {
            if (this._compare(current.get(), value) === 0) {
                const removed_value: T = current.get();
                if (current.getNext() !== null) {
                    prev.setNext(current.getNext());
                } else {
                    prev.setNext(null);
                }
                this._size--;
                return removed_value;
            }
            prev = current;
            current = current.getNext();
        }

        return null;
    }

    /**
     * Checks if the linked list contains the specified value.
     * @param {T} value The value to check for.
     * @returns {boolean} True if the value is found, otherwise false.
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the list.
     * Space complexity: O(1) - Constant space operation
     */
    public contains(value: T): boolean {
        if (this._head === null) {
            return false;
        } else if (this._compare(this._head.get(), value) === 0) {
            return true;
        }

        let current: Node<T> | null = this._head;

        while (current !== null) {
            if (this._compare(current.get(), value) === 0) {
                return true;
            }
            current = current.getNext();
        }
        return false;
    }

    /**
     * Checks if the linked list is empty.
     * @returns {boolean} True if the linked list is empty, otherwise false.
     * @complexity
     *Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation
     */
    public isEmpty(): boolean {
        return this._head === null;
    }

    /**
     * Gets the size of the linked list.
     * @returns {number} The number of elements in the linked list.
     * @complexity
     *Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation
     */
    public size(): number {
        return this._size;
    }

    /**
     * Clears the linked list.
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the list.
     * Space complexity: O(1) - Constant space operation
     */
    public clear(): void {
        let current: Node<T> | null = this._head;
        while (current !== null) {
            let next: Node<T> | null = current.getNext();
            current.setNext(null);
            current = next;
        }
        this._head = null;
        this._size = 0;
    }

    /**
     * Gets the value at the specified index.
     * @param {number} index The index of the value to get.
     * @returns {T | null} The value at the specified index, or null if the index is out of bounds.
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the list.
     * Space complexity: O(1) - Constant space operation
     */
    public get(index: number): T | null {
        if (index < 0 || index >= this._size || this._head === null) {
            return null;
        }

        let current: Node<T> | null = this._head as Node<T> | null;
        for (let i: number = 0; i < index; i++) {
            if (current === null) {
                return null;
            }
            current = current.getNext();
        }

        return current?.get() as T;
    }

    /**
     * Sets the value at the specified index.
     * @param {number} index The index of the value to set.
     * @param {T} value The value to set.
     * @returns {boolean} True if the value was set, otherwise false.
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the list.
     * Space complexity: O(1) - Constant space operation
     */
    public set(index: number, value: T): boolean {
        if (index < 0 || index >= this._size || this._head === null) {
            return false;
        }

        let current: Node<T> | null = this._head as Node<T> | null;
        for (let i: number = 0; i < index; i++) {
            if (current === null) {
                return false;
            }
            current = current.getNext();
        }

        if (current !== null) {
            current.set(value);
            return true;
        }

        return false;
    }

    /**
     * Converts the linked list to an array.
     * @returns {T[]} An array containing all elements of the linked list.
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the list.
     * Space complexity: O(n) - Where n is the number of elements in the list.
     */
    public toArray(): T[] {
        if (this._head === null) {
            return [];
        }

        const list_to_array: T[] = [];
        let current: Node<T> | null = this._head;

        while (current) {
            list_to_array.push(current.get());
            current = current.getNext();
        }

        return list_to_array;
    }
}