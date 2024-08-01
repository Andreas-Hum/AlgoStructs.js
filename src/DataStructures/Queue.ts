/**
 * A generic Queue class implemented using an array.
 * 
 * @template T - The type of elements in the queue.
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
     */
    public clear(): void {
        this.items = [];
    }
}