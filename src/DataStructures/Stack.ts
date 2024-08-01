/**
 * A generic Stack class implemented using an array.
 * 
 * @template T - The type of elements in the stack.
 */
export default class Stack<T> {
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
     */
    public clear(): void {
        this.items = [];
    }
}