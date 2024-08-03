/**
 * A generic Queue class implemented using an array.
 * 
 * @template T - The type of elements in the queue.
 * 
 * @description
 * A queue is a collection of entities that are maintained in a sequence and can be modified by the addition of entities at one end of the sequence and the removal of entities from the other end of the sequence.
 * 
 * This implementation uses an array to store the elements of the queue.
 * 
 * The class provides the following methods:
 * 1. The `enqueue` method adds one or more elements to the end of the queue.
 * 2. The `dequeue` method removes and returns the element at the front of the queue.
 * 3. The `front` method returns the element at the front of the queue without removing it.
 * 4. The `isEmpty` method checks if the queue is empty.
 * 5. The `size` method returns the number of elements in the queue.
 * 6. The `clear` method removes all elements from the queue.
 * 7. The `[Symbol.iterator]` method returns an iterator for the queue.
 * 
 * @example
 * // Create a new queue
 * const queue = new Queue<number>();
 * 
 * // Add elements to the queue
 * queue.enqueue(1, 2, 3);
 * 
 * // Retrieve elements from the queue
 * console.log(queue.dequeue()); // Output: 1
 * 
 * // Check the element at the front of the queue
 * console.log(queue.front()); // Output: 2
 * 
 * // Check if the queue is empty
 * console.log(queue.isEmpty()); // Output: false
 * 
 * // Get the size of the queue
 * console.log(queue.size()); // Output: 2
 * 
 * // Clear the queue
 * queue.clear();
 * console.log(queue.size()); // Output: 0
 * 
 */
export class Queue<T> {
    private items: T[] = [];

    /**
     * Adds one or more elements to the end of the queue.
     * 
     * @param {...T[]} element - The elements to add to the queue.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(n) - Where n is the number of elements in the queue.
     * 
     * @example
     * const queue: Queue<number> = new Queue<number>();
     * queue.enqueue(1, 2, 3);
     * console.log(queue); // Output: Queue { items: [1, 2, 3] }
     */
    public enqueue(...element: T[]): void {
        this.items.push(...element);
    }

    /**
     * Removes and returns the element at the front of the queue.
     * 
     * @returns {T | undefined} - The element at the front of the queue, or undefined if the queue is empty.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the queue (due to array shift operation).
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const queue: Queue<number> = new Queue<number>();
     * queue.enqueue(1, 2, 3);
     * console.log(queue.dequeue()); // Output: 1
     */
    public dequeue(): T | undefined {
        return this.items.shift();
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * 
     * @returns {T | undefined} - The element at the front of the queue, or undefined if the queue is empty.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const queue: Queue<number> = new Queue<number>();
     * queue.enqueue(1, 2, 3);
     * console.log(queue.front()); // Output: 2
     */
    public front(): T | undefined {
        return this.items[0];
    }

    /**
     * Checks if the queue is empty.
     * 
     * @returns {boolean} - True if the queue is empty, false otherwise.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const queue: Queue<number> = new Queue<number>();
     * console.log(queue.isEmpty()); // Output: true
     * queue.enqueue(1);
     * console.log(queue.isEmpty()); // Output: false
     */
    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the queue.
     * 
     * @returns {number} - The number of elements in the queue.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const queue: Queue<number> = new Queue<number>();
     * queue.enqueue(1, 2, 3);
     * console.log(queue.size()); // Output: 3
     */
    public size(): number {
        return this.items.length;
    }

    /**
     * Removes all elements from the queue.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const queue: Queue<number> = new Queue<number>();
     * queue.enqueue(1, 2, 3);
     * queue.clear();
     * console.log(queue.size()); // Output: 0
     */
    public clear(): void {
        this.items = [];
    }

    /**
     * Implements the iterable interface for the queue.
     * 
     * @returns {IterableIterator<T>} - An iterator for the queue.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the queue.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const queue: Queue<number> = new Queue<number>();
     * queue.enqueue(1, 2, 3);
     * for (const item of queue) {
     *     console.log(item); // Output: 1, 2, 3
     * }
     */
    *[Symbol.iterator](): IterableIterator<T> {
        for (const item of this.items) {
            yield item;
        }
    }
}
