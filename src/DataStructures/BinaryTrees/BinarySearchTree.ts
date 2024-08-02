import Node from "./Nodes/BinaryTreeNode";


/**
 * Represents a binary tree.
 * 
 * @template T - The type of elements in the tree.
 */
export default class BinarySearchTree<T> {
    private _root: Node<T> | null;
    private _size: number;
    private _compare: (a: T, b: T) => number;

    /**
     * Creates an instance of a binary search tree.
     * 
     * @param {(a: T, b: T) => number} compare - The comparison function used to order the elements in the tree.
     * @remark
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
        this._root = null;
        this._size = 0;
    }

    /**
     * Checks if the binary search tree contains a node with the given value.
     * 
     * @param {T} val - The value to check for.
     * @returns {boolean} True if the tree contains a node with the given value, false otherwise.
     * 
     * @complexity
     * Time complexity: O(log n) - where n is the number of nodes in the tree.
     * Space complexity: O(1) - Constant space operation
     */
    public contains(val: T): boolean {
        return this.getNode(val) !== null;
    }

    /**
     * Deletes a node with the given value.
     * @param {T} val - The value to delete.
     * @returns {boolean} True if the node was found and deleted, false otherwise.
     * @complexity
     * Time complexity: O(log n) - where n is the number of nodes in the tree.
     * Space complexity: O(1) - Constant space operation
     */
    public delete(val: T): boolean {
        const nodeToDelete: Node<T> | null = this.getNode(val);
        if (nodeToDelete === null) {
            return false;
        }

        if (nodeToDelete.getLeftChild() === null) {
            this._shiftNodes(nodeToDelete, nodeToDelete.getRightChild());
        } else if (nodeToDelete.getRightChild() === null) {
            this._shiftNodes(nodeToDelete, nodeToDelete.getLeftChild());
        } else {
            const successor: Node<T> | null = this._successor(nodeToDelete);
            if (successor !== null && successor.getParent() !== nodeToDelete) {
                this._shiftNodes(successor, successor.getRightChild());
                successor.setRightChild(nodeToDelete.getRightChild());
                if (successor.getRightChild() !== null) {
                    successor.getRightChild()?.setParent(successor);
                }
            }
            this._shiftNodes(nodeToDelete, successor);
            if (successor !== null) {
                successor.setLeftChild(nodeToDelete.getLeftChild());
                if (successor.getLeftChild() !== null) {
                    successor.getLeftChild()?.setParent(successor);
                }
            }
        }

        this._size--;
        return true;
    }

    /**
     * Finds a node with the given value.
     * @param {T} target - The value to find.
     * @returns {Node<T> | null} The node with the given value, or null if not found.
     * @complexity
     * Time complexity: O(log n) - where n is the number of nodes in the tree.
     * Space complexity: O(1) - Constant space operation
     */
    public getNode(target: T): Node<T> | null {
        let current: Node<T> | null = this._root;

        while (current !== null) {
            const comparison: number = this._compare(current.get(), target);
            if (comparison < 0) {
                current = current.getLeftChild();
            } else if (comparison > 0) {
                current = current.getRightChild();
            } else {
                return current;
            }
        }
        return null;
    }

    /**
     * Gets the height of the binary search tree.
     * @param {Node<T> | null} node - The node to start from.
     * @returns {number} The height of the tree.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(h) - where h is the height of the tree.
     */
    public getHeight(node: Node<T> | null): number {
        if (node === null) {
            return -1;
        }

        const left_height: number = this.getHeight(node.getLeftChild());
        const right_height: number = this.getHeight(node.getRightChild());

        return Math.max(left_height, right_height) + 1;
    }

    /**
     * Finds the node with the minimum value in the binary search tree.
     * 
     * @returns {Node<T> | null} - The node with the minimum value, or null if the tree is empty.
     * 
     * @complexity
     * Time complexity: O(h) - where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     */
    public getMinNode(): Node<T> | null {
        let current: Node<T> | null = this._root;

        while (current !== null && current.getLeftChild() !== null) {
            current = current.getLeftChild();
        }

        return current;
    }

    /**
     * Finds the node with the maximum value in the binary search tree.
     * 
     * @returns {Node<T> | null} - The node with the maximum value, or null if the tree is empty.
     * 
     * @complexity
     * Time complexity: O(h) - where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     */
    public getMaxNode(): Node<T> | null {
        let current: Node<T> | null = this._root;

        while (current !== null && current.getRightChild() !== null) {
            current = current.getRightChild();
        }

        return current;
    }

    /**
     * Finds the in-order predecessor of a given node.
     * @param {Node<T>} node - The node to find the predecessor of.
     * @returns {Node<T> | null} - The predecessor node, or null if none exists.
     * @complexity
     * Time complexity: O(h) - where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     */
    public getPredecessor(node: Node<T>): Node<T> | null {
        if (node.getLeftChild() !== null) {
            let current: Node<T> | null = node.getLeftChild();
            while (current?.getRightChild() !== null) {
                current = current!.getRightChild();
            }
            return current;
        } else {
            let current: Node<T> = node;
            let parent: Node<T> | null = current.getParent();
            while (parent !== null && current === parent.getLeftChild()) {
                current = parent;
                parent = parent.getParent();
            }
            return parent;
        }
    }

    /**
     * Finds the in-order successor of a given node.
     * @param {Node<T>} node - The node to find the successor of.
     * @returns {Node<T> | null} - The successor node, or null if none exists.
     * @complexity
     * Time complexity: O(h) - where h is the height of the tree.
     * Space complexity: O(1) - Constant space operation.
     */
    public getSuccessor(node: Node<T>): Node<T> | null {
        if (node.getRightChild() !== null) {
            let current: Node<T> | null = node.getRightChild();
            while (current !== null && current.getLeftChild() !== null) {
                current = current.getLeftChild();
            }
            return current;
        } else {
            let current: Node<T> = node;
            let parent: Node<T> | null = current.getParent();
            while (parent !== null && current === parent.getRightChild()) {
                current = parent;
                parent = parent.getParent();
            }
            return parent;
        }
    }

    /**
     * Returns the root node of the binary tree.
     * 
     * @returns {Node<T> | null} The root node of the tree, or null if the tree is empty.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    public getRoot(): Node<T> | null {
        return this._root;
    }

    /**
     * Returns the number of elements in the binary tree.
     * 
     * @returns {number} The size of the tree.
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    public getSize(): number {
        return this._size;
    }

    /**
     * Performs an in-order traversal of the binary tree.
     * @returns {T[]} An array of node values in in-order.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(n) - where n is the number of nodes in the tree.
     */
    public inOrderTraversal(): T[] {
        const result: T[] = [];
        const traverse: (node: Node<T> | null) => void = (node: Node<T> | null): void => {
            if (node === null) return;
            traverse(node.getLeftChild());
            result.push(node.get());
            traverse(node.getRightChild());
        };
        traverse(this._root);
        return result;
    }

    /**
     * Inserts a value into the binary search tree.
     * @param {T} val - The value to insert.
     * @returns {number} The new size of the tree.
     * @complexity
     * Time complexity: O(log n) - where n is the number of nodes in the tree.
     * Space complexity: O(1) - Constant space operation
     */
    public insert(val: T): number {
        const new_node: Node<T> = new Node<T>(val);

        let parent: Node<T> | null = null;
        let current: Node<T> | null = this._root;

        while (current !== null) {
            parent = current;
            if (this._compare(new_node.get(), current.get()) < 0) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }

        new_node.setParent(parent);

        if (parent === null) {
            this._root = new_node;
        } else if (this._compare(new_node.get(), parent.get()) < 0) {
            parent.setLeftChild(new_node);
        } else {
            parent.setRightChild(new_node);
        }

        this._size++;
        return this._size;
    }

    /**
     * Checks if the tree is balanced.
     * @returns {boolean} True if the tree is balanced, false otherwise.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(h) - where h is the height of the tree.
     */
    public isBalanced(): boolean {
        const checkHeight: (node: Node<T> | null) => number = (node: Node<T> | null): number => {
            if (node === null) return 0;

            const left_height: number = checkHeight(node.getLeftChild());
            if (left_height === -1) return -1;

            const right_height: number = checkHeight(node.getRightChild());
            if (right_height === -1) return -1;

            if (Math.abs(left_height - right_height) > 1) return -1;

            return Math.max(left_height, right_height) + 1;
        };

        return checkHeight(this._root) !== -1;
    }

    /**
     * Checks if the tree is complete.
     * @returns {boolean} True if the tree is complete, false otherwise.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(h) - where h is the height of the tree.
     */
    public isComplete(): boolean {
        if (this._root === null) return true;

        const queue: (Node<T> | null)[] = [this._root];
        let reached_end: boolean = false;

        while (queue.length > 0) {
            const current: Node<T> | null = queue.shift() as Node<T> | null;

            if (current === null) {
                reached_end = true;
            } else {
                if (reached_end) return false;

                queue.push(current.getLeftChild());
                queue.push(current.getRightChild());
            }
        }

        return true;
    }

    /**
     * Checks if the tree is full.
     * @returns {boolean} True if the tree is full, false otherwise.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(h) - where h is the height of the tree.
     */
    public isFull(): boolean {
        const checkFull = (node: Node<T> | null): boolean => {
            if (node === null) return true;

            const left_child: Node<T> | null = node.getLeftChild();
            const right_child: Node<T> | null = node.getRightChild();

            if ((left_child === null && right_child !== null) || (left_child !== null && right_child === null)) {
                return false;
            }

            return checkFull(left_child) && checkFull(right_child);
        };

        return checkFull(this._root);
    }

    /**
     * Performs a post-order traversal of the binary tree.
     * @returns {T[]} An array of node values in post-order.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(n) - where n is the number of nodes in the tree.
     */
    public postOrderTraversal(): T[] {
        const result: T[] = [];
        const traverse: (node: Node<T> | null) => void = (node: Node<T> | null): void => {
            if (node === null) return;
            traverse(node.getLeftChild());
            traverse(node.getRightChild());
            result.push(node.get());
        };
        traverse(this._root);
        return result;
    }

    /**
     * Performs a pre-order traversal of the binary tree.
     * @returns {T[]} An array of node values in pre-order.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(n) - where n is the number of nodes in the tree.
     */
    public preOrderTraversal(): T[] {
        const result: T[] = [];
        const traverse: (node: Node<T> | null) => void = (node: Node<T> | null): void => {
            if (node === null) return;
            result.push(node.get());
            traverse(node.getLeftChild());
            traverse(node.getRightChild());
        };
        traverse(this._root);
        return result;
    }

    /**
     * Sets the value of a node with the given value.
     * @param {T} target - The value to find.
     * @param {T} newVal - The new value to set.
     * @returns {boolean} True if the node was found and updated, false otherwise.
     * @complexity
     * Time complexity: O(log n) - where n is the number of nodes in the tree.
     * Space complexity: O(h) - where h is the height of the tree.
     */
    public setNode(target: T, newVal: T): boolean {
        const node: Node<T> | null = this.getNode(target);
        if (node !== null) {
            node.set(newVal);
            return true;
        }
        return false;
    }

    /**
     * Performs a level-order traversal (breadth-first traversal) of the binary search tree.
     * @returns {T[]} An array of node values in level-order.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(n) - where n is the number of nodes in the tree.
     */
    public levelOrderTraversal(): T[] {
        const result: T[] = [];
        const queue: (Node<T> | null)[] = [this._root];

        while (queue.length > 0) {
            const node: Node<T> | null = queue.shift() as Node<T> | null;
            if (node !== null) {
                result.push(node.get());
                queue.push(node.getLeftChild());
                queue.push(node.getRightChild());
            }
        }

        return result;
    }

    /**
     * Clears all nodes from the tree.
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     */
    public clear(): void {
        this._root = null;
        this._size = 0;
    }

    private _shiftNodes(a: Node<T>, b: Node<T> | null): void {
        if (a.getParent() === null) {
            this._root = b;
        } else if (a === a.getParent()?.getLeftChild()) {
            a.getParent()?.setLeftChild(b);
        } else {
            a.getParent()?.setRightChild(b);
        }
        if (b !== null) {
            b.setParent(a.getParent());
        }
    }

    private _successor(node: Node<T>): Node<T> | null {
        if (node.getRightChild() !== null) {
            let current: Node<T> | null = node.getRightChild();
            while (current?.getLeftChild() !== null) {
                current = current!.getLeftChild();
            }
            return current;
        } else {
            let current: Node<T> = node;
            let parent: Node<T> | null = current.getParent();
            while (parent !== null && current === parent.getRightChild()) {
                current = parent;
                parent = parent.getParent();
            }
            return parent;
        }
    }

    /**
     * Implements the iterable interface for the binary search tree.
     * @returns {IterableIterator<T>} - An iterator for the binary search tree.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     */
    *[Symbol.iterator](): IterableIterator<T> {
        yield* this.inOrderTraversalGenerator(this._root);
    }

    /**
     * Generator for in-order traversal.
     * @param {Node<T> | null} node - The node to start from.
     * @yields {IterableIterator<T>} - An iterator for in-order traversal.
     */
    private *inOrderTraversalGenerator(node: Node<T> | null): IterableIterator<T> {
        if (node !== null) {
            yield* this.inOrderTraversalGenerator(node.getLeftChild());
            yield node.get();
            yield* this.inOrderTraversalGenerator(node.getRightChild());
        }
    }
}
