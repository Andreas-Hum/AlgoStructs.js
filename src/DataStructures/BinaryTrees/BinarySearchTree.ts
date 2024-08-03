import Node from "./Nodes/BinaryTreeNode";

/**
 * Represents a binary search tree data structure.
 * 
 * @template T - The type of elements in the tree.
 * 
 * @description
 * A binary search tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.
 * Each node's left subtree contains only nodes with values less than the node's value, and each node's right subtree contains only nodes with values greater than the node's value.
 * 
 * This implementation provides methods to insert, delete, and search for elements, as well as to check the properties of the tree (e.g., balanced, complete, full).
 * 
 * The class provides the following methods:
 * 1. `insert` - Adds a value to the tree.
 * 2. `delete` - Removes a value from the tree.
 * 3. `contains` - Checks if a value is in the tree.
 * 4. `getNode` - Finds and returns a node with a specific value.
 * 5. `getHeight` - Returns the height of the tree.
 * 6. `getMinNode` - Returns the node with the minimum value.
 * 7. `getMaxNode` - Returns the node with the maximum value.
 * 8. `getPredecessor` - Returns the predecessor of a given node.
 * 9. `getSuccessor` - Returns the successor of a given node.
 * 10. `getRoot` - Returns the root node of the tree.
 * 11. `getSize` - Returns the number of elements in the tree.
 * 12. `setNode` - Sets the value of a node with a specific value.
 * 13. `clear` - Clears all elements from the tree.
 * 14. `isBalanced` - Checks if the tree is balanced.
 * 15. `isComplete` - Checks if the tree is complete.
 * 16. `isFull` - Checks if the tree is full.
 * 17. `Symbol.iterator` - Implements the iterable interface for the tree.
 * 
 * @example
 * // Create a new binary search tree
 * const compareNumbers: (a: number, b: number) => number = (a: number, b: number) => a - b;
 * const tree: BinarySearchTree<number> = new BinarySearchTree<number>(compareNumbers);
 * 
 * // Insert elements into the tree
 * tree.insert(10);
 * tree.insert(5);
 * tree.insert(15);
 * 
 * // Check if the tree contains a specific value
 * console.log(tree.contains(10)); // Output: true
 * console.log(tree.contains(7)); // Output: false
 * 
 * // Get the root node of the tree
 * console.log(tree.getRoot()?.get()); // Output: 10
 * 
 * // Get the size of the tree
 * console.log(tree.getSize()); // Output: 3
 * 
 * // Check if the tree is balanced
 * console.log(tree.isBalanced()); // Output: true
 * 
 * // Iterate over the tree
 * for (const value of tree) {
 *     console.log(value); // Output: 5, 10, 15 (in-order traversal)
 * }
 */
export class BinarySearchTree<T> {
    private _root: Node<T> | null = null;
    private _size: number = 0;
    private _compare: (a: T, b: T) => number;

    /**
     * Creates an instance of a binary search tree.
     * 
     * @param {(a: T, b: T) => number} compare - The comparison function used to order the elements in the tree.
     * @remarks
     * The comparison function should return:
     * - A negative number if the first argument is less than the second.
     * - Zero if the first argument is equal to the second.
     * - A positive number if the first argument is greater than the second.
     * 
     * @example
     * const compareNumbers: (a: number, b: number) => number = (a: number, b: number) => a - b;
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>(compareNumbers);
     */
    constructor(compare: (a: T, b: T) => number) {
        this._compare = compare;
    }

    /**
     * Checks if the binary search tree contains a node with the given value.
     * 
     * @param {T} val - The value to check for.
     * @returns {boolean} True if the tree contains a node with the given value, false otherwise.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.contains(10)); // Output: true
     * console.log(tree.contains(5)); // Output: false
     */
    public contains(val: T): boolean {
        return this.getNode(val) !== null;
    }

    /**
     * Deletes a value from the binary search tree.
     * 
     * @param {T} val - The value to delete.
     * @returns {boolean} True if the value was deleted, false otherwise.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.delete(10)); // Output: true
     * console.log(tree.contains(10)); // Output: false
     */
    public delete(val: T): boolean {
        const nodeToDelete: Node<T> | null = this.getNode(val);
        if (!nodeToDelete) return false;

        if (nodeToDelete.getLeftChild() && nodeToDelete.getRightChild()) {
            const successor: Node<T> | null = this.getSuccessor(nodeToDelete);
            if (successor) {
                nodeToDelete.set(successor.get());
                this._shiftNodes(successor, successor.getRightChild());
            }
        } else {
            const child: Node<T> | null = nodeToDelete.getLeftChild() || nodeToDelete.getRightChild();
            this._shiftNodes(nodeToDelete, child);
        }

        this._size--;
        return true;
    }

    /**
     * Finds and returns a node with a specific value.
     * 
     * @param {T} target - The value to find.
     * @returns {Node<T> | null} The node with the specified value, or null if not found.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.getNode(10)?.get()); // Output: 10
     * console.log(tree.getNode(5)); // Output: null
     */
    public getNode(target: T): Node<T> | null {
        let current: Node<T> | null = this._root;
        while (current) {
            const cmp: number = this._compare(target, current.get());
            if (cmp === 0) return current;
            current = cmp < 0 ? current.getLeftChild() : current.getRightChild();
        }
        return null;
    }

    /**
     * Gets the height of the binary search tree.
     * 
     * @param {Node<T> | null} [node=this._root] - The node to start from.
     * @returns {number} The height of the tree.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.getHeight(tree.getRoot())); // Output: 1
     */
    public getHeight(node: Node<T> | null = this._root): number {
        if (!node) return 0;
        return 1 + Math.max(this.getHeight(node.getLeftChild()), this.getHeight(node.getRightChild()));
    }

    /**
     * Gets the node with the minimum value in the tree.
     * 
     * @returns {Node<T> | null} The node with the minimum value, or null if the tree is empty.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.getMinNode()?.get()); // Output: 5
     */
    public getMinNode(): Node<T> | null {
        return this._getMinNode(this._root);
    }

    /**
     * Gets the node with the maximum value in the tree.
     * 
     * @returns {Node<T> | null} The node with the maximum value, or null if the tree is empty.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.getMaxNode()?.get()); // Output: 15
     */
    public getMaxNode(): Node<T> | null {
        let current: Node<T> | null = this._root;
        while (current && current.getRightChild()) {
            current = current.getRightChild();
        }
        return current;
    }

    /**
     * Gets the predecessor of a given node.
     * 
     * @param {Node<T>} node - The node to find the predecessor for.
     * @returns {Node<T> | null} The predecessor node, or null if no predecessor exists.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * const node = new Node<number>(10);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.getPredecessor(node)?.get()); // Output: 5
     */
    public getPredecessor(node: Node<T>): Node<T> | null {
        if (node.getLeftChild()) {
            let current: Node<T> | null = node.getLeftChild();
            while (current && current.getRightChild()) {
                current = current.getRightChild();
            }
            return current;
        }
        let current: Node<T> | null = node;
        let parent: Node<T> | null = node.getParent();
        while (parent && current === parent.getLeftChild()) {
            current = parent;
            parent = parent.getParent();
        }
        return parent;
    }

    /**
     * Gets the successor of a given node.
     * 
     * @param {Node<T>} node - The node to find the successor for.
     * @returns {Node<T> | null} The successor node, or null if no successor exists.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * const node = new Node<number>(10);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.getSuccessor(node)?.get()); // Output: 15
     */
    public getSuccessor(node: Node<T>): Node<T> | null {
        if (node.getRightChild()) {
            let current: Node<T> | null = node.getRightChild();
            while (current && current.getLeftChild()) {
                current = current.getLeftChild();
            }
            return current;
        }
        let current: Node<T> | null = node;
        let parent: Node<T> | null = node.getParent();
        while (parent && current === parent.getRightChild()) {
            current = parent;
            parent = parent.getParent();
        }
        return parent;
    }

    /**
     * Returns the root node of the binary search tree.
     * 
     * @returns {Node<T> | null} The root node of the tree, or null if the tree is empty.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.getRoot()?.get()); // Output: 10
     */
    public getRoot(): Node<T> | null {
        return this._root;
    }

    /**
     * Returns the number of elements in the binary search tree.
     * 
     * @returns {number} The size of the tree.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.getSize()); // Output: 2
     */
    public getSize(): number {
        return this._size;
    }

    /**
     * Inserts a value into the binary search tree.
     * 
     * @param {T} val - The value to insert.
     * @returns {number} The new size of the tree.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.getSize()); // Output: 2
     */
    public insert(val: T): number {
        const newNode: Node<T> = new Node(val);
        if (!this._root) {
            this._root = newNode;
            this._size++;
            return this._size;
        }
        let current: Node<T> | null = this._root;
        let parent: Node<T> | null = null;
        while (current) {
            parent = current;
            const cmp: number = this._compare(val, current.get());
            if (cmp < 0) {
                current = current.getLeftChild() as Node<T>;
            } else {
                current = current.getRightChild() as Node<T>;
            }
        }
        if (parent) {
            if (this._compare(val, parent.get()) < 0) {
                parent.setLeftChild(newNode);
            } else {
                parent.setRightChild(newNode);
            }
            newNode.setParent(parent);
        }
        this._size++;
        return this._size;
    }

    /**
     * Checks if the binary search tree is balanced.
     * 
     * @returns {boolean} True if the tree is balanced, false otherwise.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.isBalanced()); // Output: true
     */
    public isBalanced(): boolean {
        const checkBalance = (node: Node<T> | null): [boolean, number] => {
            if (!node) return [true, 0];
            const [leftBalanced, leftHeight]: [boolean, number] = checkBalance(node.getLeftChild());
            const [rightBalanced, rightHeight]: [boolean, number] = checkBalance(node.getRightChild());
            const balanced: boolean = leftBalanced && rightBalanced && Math.abs(leftHeight - rightHeight) <= 1;
            return [balanced, 1 + Math.max(leftHeight, rightHeight)];
        };
        return checkBalance(this._root)[0];
    }

    /**
     * Checks if the binary search tree is complete.
     * 
     * @returns {boolean} True if the tree is complete, false otherwise.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(n) - Where n is the number of nodes in the tree.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.isComplete()); // Output: true
     */
    public isComplete(): boolean {
        if (!this._root) return true;
        const queue: (Node<T> | null)[] = [this._root];
        let reachedEnd: boolean = false;
        while (queue.length > 0) {
            const current: Node<T> | null = queue.shift()!;
            if (!current) {
                reachedEnd = true;
            } else {
                if (reachedEnd) return false;
                queue.push(current.getLeftChild());
                queue.push(current.getRightChild());
            }
        }
        return true;
    }

    /**
     * Checks if the binary search tree is full.
     * 
     * @returns {boolean} True if the tree is full, false otherwise.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(n) - Where n is the number of nodes in the tree.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.isFull()); // Output: false
     */
    public isFull(): boolean {
        const checkFull = (node: Node<T> | null): boolean => {
            if (!node) return true;
            if ((node.getLeftChild() && !node.getRightChild()) || (!node.getLeftChild() && node.getRightChild())) {
                return false;
            }
            return checkFull(node.getLeftChild()) && checkFull(node.getRightChild());
        };
        return checkFull(this._root);
    }

    /**
     * Sets the value of a node with the given value.
     * 
     * @param {T} target - The value to find.
     * @param {T} newVal - The new value to set.
     * @returns {boolean} True if the node was found and updated, false otherwise.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.setNode(10, 20)); // Output: true
     * console.log(tree.getNode(20)?.get()); // Output: 20
     * console.log(tree.getNode(10)); // Output: null
     */
    public setNode(target: T, newVal: T): boolean {
        const node: Node<T> | null = this.getNode(target);
        if (node) {
            node.set(newVal);
            return true;
        }
        return false;
    }

    /**
     * Clears all nodes from the binary search tree.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.clear();
     * console.log(tree.getSize()); // Output: 0
     */
    public clear(): void {
        this._root = null;
        this._size = 0;
    }

    /**
     * Implements the iterable interface for the binary search tree.
     * 
     * @returns {IterableIterator<T>} - An iterator for the binary search tree.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * 
     * @example
     * const tree: BinarySearchTree<number> = new BinarySearchTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * for (const value of tree) {
     *     console.log(value); // Output: 5, 10, 15 (in-order traversal)
     * }
     */
    *[Symbol.iterator](): IterableIterator<T> {
        yield* this._inOrderTraversalGenerator(this._root);
    }

    /**
     * Shifts nodes during deletion.
     * 
     * @private
     * @param {Node<T>} a - The node to shift.
     * @param {Node<T> | null} b - The replacement node.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    private _shiftNodes(a: Node<T>, b: Node<T> | null): void {
        if (a.getParent() === null) {
            this._root = b;
        } else if (a === a.getParent()?.getLeftChild()) {
            a.getParent()?.setLeftChild(b);
        } else {
            a.getParent()?.setRightChild(b);
        }
        if (b) {
            b.setParent(a.getParent());
        }
    }

    /**
     * Gets the node with the minimum value starting from a specific node.
     * 
     * @private
     * @param {Node<T> | null} node - The node to start from.
     * @returns {Node<T> | null} The node with the minimum value, or null if not found.
     * 
     * @complexity
     * Time complexity: O(h) - Where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     */
    private _getMinNode(node: Node<T> | null): Node<T> | null {
        let current: Node<T> | null = node;
        while (current && current.getLeftChild()) {
            current = current.getLeftChild();
        }
        return current;
    }

    /**
     * Generator for in-order traversal.
     * 
     * @private
     * @param {Node<T> | null} node - The node to start from.
     * @yields {IterableIterator<T>} - An iterator for in-order traversal.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     */
    private *_inOrderTraversalGenerator(node: Node<T> | null): IterableIterator<T> {
        if (node) {
            yield* this._inOrderTraversalGenerator(node.getLeftChild());
            yield node.get();
            yield* this._inOrderTraversalGenerator(node.getRightChild());
        }
    }
}
