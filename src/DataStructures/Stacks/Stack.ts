/**
 * A generic Stack class implemented using an array.
 * 
 * @template T - The type of elements in the stack.
 * 
 * @description
 * A stack is a collection of elements that follows the Last-In-First-Out (LIFO) principle. 
 * The most recently added element is the first one to be removed.
 * 
 * This implementation uses an array to store the elements of the stack.
 * 
 * The class provides the following methods:
 * 1. The `push` method adds one or more elements to the top of the stack.
 * 2. The `pop` method removes and returns the element at the top of the stack.
 * 3. The `peek` method returns the element at the top of the stack without removing it.
 * 4. The `isEmpty` method checks if the stack is empty.
 * 5. The `size` method returns the number of elements in the stack.
 * 6. The `clear` method removes all elements from the stack.
 * 7. The `[Symbol.iterator]` method returns an iterator for the stack.
 * 
 * @example
 * // Create a new stack
 * const stack: Stack<number> = new Stack<number>();
 * 
 * // Add elements to the stack
 * stack.push(1, 2, 3);
 * console.log(stack); // Output: Stack { items: [1, 2, 3] }
 * 
 * // Remove an element from the stack
 * console.log(stack.pop()); // Output: 3
 * 
 * // Check the element at the top of the stack
 * console.log(stack.peek()); // Output: 2
 * 
 * // Check if the stack is empty
 * console.log(stack.isEmpty()); // Output: false
 * 
 * // Get the size of the stack
 * console.log(stack.size()); // Output: 2
 * 
 * // Clear the stack
 * stack.clear();
 * console.log(stack.size()); // Output: 0
 * 
 */
export class Stack<T> {
    private items: T[] = [];

    /**
     * Adds one or more elements to the top of the stack.
     * 
     * @param {...T[]} element - The elements to add to the stack.
     * 
     * @complexity
     * Time complexity: O(1) - For each element added.
     * Space complexity: O(n) - where n is the number of elements in the stack.
     * 
     * @example
     * const stack: Stack<number> = new Stack<number>();
     * stack.push(1);
     * stack.push(2, 3, 4);
     * console.log(stack); // Output: Stack { items: [1, 2, 3, 4] }
     */
    public push(...element: T[]): void {
        this.items.push(...element);
    }

    /**
     * Removes and returns the element at the top of the stack.
     * 
     * @returns {T | undefined} - The element at the top of the stack, or undefined if the stack is empty.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const stack: Stack<number> = new Stack<number>();
     * stack.push(1, 2, 3);
     * console.log(stack.pop()); // Output: 3
     */
    public pop(): T | undefined {
        return this.items.pop();
    }

    /**
     * Returns the element at the top of the stack without removing it.
     * 
     * @returns {T | undefined} - The element at the top of the stack, or undefined if the stack is empty.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const stack: Stack<number> = new Stack<number>();
     * stack.push(1, 2, 3);
     * console.log(stack.peek()); // Output: 3
     */
    public peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    /**
     * Checks if the stack is empty.
     * 
     * @returns {boolean} - True if the stack is empty, false otherwise.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const stack: Stack<number> = new Stack<number>();
     * console.log(stack.isEmpty()); // Output: true
     * stack.push(1);
     * console.log(stack.isEmpty()); // Output: false
     */
    public isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Returns the number of elements in the stack.
     * 
     * @returns {number} - The number of elements in the stack.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const stack: Stack<number> = new Stack<number>();
     * stack.push(1, 2, 3);
     * console.log(stack.size()); // Output: 3
     */
    public size(): number {
        return this.items.length;
    }

    /**
     * Removes all elements from the stack.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const stack: Stack<number> = new Stack<number>();
     * stack.push(1, 2, 3);
     * stack.clear();
     * console.log(stack.size()); // Output: 0
     */
    public clear(): void {
        this.items = [];
    }

    /**
     * Implements the iterable interface for the stack.
     * 
     * @returns {IterableIterator<T>} - An iterator for the stack.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of elements in the stack.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const stack: Stack<number> = new Stack<number>();
     * stack.push(1, 2, 3);
     * for (const item of stack) {
     *     console.log(item); // Output: 3, 2, 1
     * }
     */
    *[Symbol.iterator](): IterableIterator<T> {
        for (let i = this.items.length - 1; i >= 0; i--) {
            yield this.items[i];
        }
    }
}
