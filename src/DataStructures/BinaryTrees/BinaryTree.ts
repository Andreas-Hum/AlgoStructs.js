import Node from "./Nodes/BinaryTreeNode";

/**
 * Represents a binary tree data structure.
 * 
 * @template T - The type of elements in the tree.
 * 
 * @description
 * A binary tree is a tree data structure in which each node has at most two children, referred to as the left child and the right child.
 * Binary trees are used to implement binary search trees and binary heaps.
 * 
 * This implementation provides methods to insert, delete, and search for elements, as well as to check the properties of the tree (e.g., balanced, complete, full).
 * 
 * The class provides the following methods:
 * 1. `insert` - Adds a value to the tree.
 * 2. `delete` - Removes a value from the tree.
 * 3. `contains` - Checks if a value is in the tree.
 * 4. `getNode` - Finds and returns a node with a specific value.
 * 5. `getHeight` - Returns the height of the tree.
 * 6. `getRoot` - Returns the root node of the tree.
 * 7. `getSize` - Returns the number of elements in the tree.
 * 8. `clear` - Clears all elements from the tree.
 * 9. `isBalanced` - Checks if the tree is balanced.
 * 10. `isComplete` - Checks if the tree is complete.
 * 11. `isFull` - Checks if the tree is full.
 * 12. `setNode` - Sets the value of a node with a specific value.
 * 13. `Symbol.iterator` - Implements the iterable interface for the tree.
 * 
 * @example
 * // Create a new binary tree
 * const compareNumbers: (a: number, b: number) => number = (a: number, b: number) => a - b;
 * const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
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
export class BinaryTree<T> {
    private _root: Node<T> | null;
    private _size: number;
    private _compare: (a: T, b: T) => number;

    /**
     * Creates an instance of a binary tree.
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
     * const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
     */
    constructor(compare: (a: T, b: T) => number) {
        this._compare = compare;
        this._root = null;
        this._size = 0;
    }

    /**
     * Clears all nodes from the tree.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
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
     * Checks if the binary tree contains a node with the given value.
     * 
     * @param {T} val - The value to check for.
     * @returns {boolean} True if the tree contains a node with the given value, false otherwise.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.contains(10)); // Output: true
     * console.log(tree.contains(5)); // Output: false
     */
    public contains(val: T): boolean {
        return this.getNode(val) !== null;
    }

    /**
     * Deletes a value from the binary tree.
     * 
     * @param {T} val - The value to delete.
     * @returns {boolean} True if the value was deleted, false otherwise.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(n) - Where n is the number of nodes in the tree.
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.delete(10)); // Output: true
     * console.log(tree.contains(10)); // Output: false
     */
    public delete(val: T): boolean {
        if (this._root === null) return false;

        const queue: Node<T>[] = [this._root];
        let node_to_delete: Node<T> | null = null;
        let parent_of_node_to_delete: Node<T> | null = null;

        while (queue.length > 0 && node_to_delete === null) {
            const current: Node<T> = queue.shift() as Node<T>;

            if (this._compare(current.get(), val) === 0) {
                node_to_delete = current;
            } else {
                if (current.getLeftChild() !== null) {
                    parent_of_node_to_delete = current;
                    queue.push(current.getLeftChild() as Node<T>);
                }
                if (current.getRightChild() !== null) {
                    parent_of_node_to_delete = current;
                    queue.push(current.getRightChild() as Node<T>);
                }
            }
        }

        if (node_to_delete === null) return false;

        if (node_to_delete === this._root) {
            this._deleteRoot();
        } else {
            this._deleteNode(node_to_delete, parent_of_node_to_delete);
        }

        this._size--;
        return true;
    }

    /**
     * Deletes the root node of the tree.
     * 
     * @private
     */
/**
 * Deletes the root node of the binary tree.
 * 
 * @private
 * 
 * @remarks
 * This method handles the deletion of the root node and updates the tree structure accordingly.
 * It considers cases where the root has no children, one child, or two children.
 * If duplicates of the root value exist, it ensures that all instances are handled correctly.
 */
private _deleteRoot(): void {
    if (this._root === null) {
        return;
    }

    if (this._root.getLeftChild() === null && this._root.getRightChild() === null) {
        this._root = null;
    } 
    else if (this._root.getLeftChild() === null) {
        this._root = this._root.getRightChild();
    } 
    else if (this._root.getRightChild() === null) {
        this._root = this._root.getLeftChild();
    } 
    else {
        const queue: Node<T>[] = [this._root];
        let deepest_rightmost: Node<T> = this._root;
        let parent_of_deepest_rightmost: Node<T> | null = null;

        while (queue.length > 0) {
            const current: Node<T> = queue.shift() as Node<T>;
            if (current.getLeftChild() !== null) {
                parent_of_deepest_rightmost = current;
                queue.push(current.getLeftChild() as Node<T>);
            }
            if (current.getRightChild() !== null) {
                parent_of_deepest_rightmost = current;
                queue.push(current.getRightChild() as Node<T>);
            }
            deepest_rightmost = current;
        }

        if (parent_of_deepest_rightmost !== null) {
            if (parent_of_deepest_rightmost.getLeftChild() === deepest_rightmost) {
                parent_of_deepest_rightmost.setLeftChild(null);
            } else {
                parent_of_deepest_rightmost.setRightChild(null);
            }
        }

        deepest_rightmost.setLeftChild(this._root.getLeftChild());
        deepest_rightmost.setRightChild(this._root.getRightChild());
        this._root = deepest_rightmost;
    }
}

    /**
     * Deletes a specified node from the tree.
     * 
     * @private
     * @param {Node<T>} node_to_delete - The node to delete.
     * @param {Node<T> | null} parent - The parent of the node to delete.
     */
    private _deleteNode(node_to_delete: Node<T>, parent: Node<T> | null): void {
        if (node_to_delete.getLeftChild() === null && node_to_delete.getRightChild() === null) {
            if (parent) {
                if (parent.getLeftChild() === node_to_delete) {
                    parent.setLeftChild(null);
                } else {
                    parent.setRightChild(null);
                }
            }
        } else if (node_to_delete.getLeftChild() === null) {
            if (parent) {
                if (parent.getLeftChild() === node_to_delete) {
                    parent.setLeftChild(node_to_delete.getRightChild());
                } else {
                    parent.setRightChild(node_to_delete.getRightChild());
                }
            }
            if (node_to_delete.getRightChild()) {
                node_to_delete.getRightChild()?.setParent(parent);
            }
        } else if (node_to_delete.getRightChild() === null) {
            if (parent) {
                if (parent.getLeftChild() === node_to_delete) {
                    parent.setLeftChild(node_to_delete.getLeftChild());
                } else {
                    parent.setRightChild(node_to_delete.getLeftChild());
                }
            }
            if (node_to_delete.getLeftChild()) {
                node_to_delete.getLeftChild()?.setParent(parent);
            }
        } else {
            const queue: Node<T>[] = [this._root as Node<T>];
            let deepest_rightmost: Node<T> = node_to_delete;
            let parent_of_deepest_rightmost: Node<T> | null = null;

            while (queue.length > 0) {
                const current: Node<T> = queue.shift() as Node<T>;
                if (current.getLeftChild() !== null) {
                    parent_of_deepest_rightmost = current;
                    queue.push(current.getLeftChild() as Node<T>);
                }
                if (current.getRightChild() !== null) {
                    parent_of_deepest_rightmost = current;
                    queue.push(current.getRightChild() as Node<T>);
                }
                deepest_rightmost = current;
            }

            if (parent_of_deepest_rightmost !== null) {
                if (parent_of_deepest_rightmost.getLeftChild() === deepest_rightmost) {
                    parent_of_deepest_rightmost.setLeftChild(null);
                } else {
                    parent_of_deepest_rightmost.setRightChild(null);
                }
            }

            node_to_delete.set(deepest_rightmost.get());
        }
    }

    /**
     * Finds a node with the given value.
     * 
     * @private
     * @param {Node<T> | null} node - The node to start from.
     * @param {T} target - The value to find.
     * @returns {Node<T> | null} The node with the given value, or null if not found.
     */
    private _findNode(node: Node<T> | null, target: T): Node<T> | null {
        if (node === null) {
            return null;
        }
        if (this._compare(node.get(), target) === 0) {
            return node;
        }

        const left_child: Node<T> | null = this._findNode(node.getLeftChild(), target);
        if (left_child !== null) {
            return left_child;
        }
        return this._findNode(node.getRightChild(), target);
    }

    /**
     * Gets the node with the given value.
     * 
     * @param {T} target - The value to find.
     * @returns {Node<T> | null} The node with the given value, or null if not found.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * 
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.getNode(10)?.get()); // Output: 10
     * console.log(tree.getNode(5)); // Output: null
     */
    public getNode(target: T): Node<T> | null {
        return this._findNode(this._root, target);
    }

    /**
     * Gets the height of the binary tree.
     * 
     * @param {Node<T> | null} node - The node to start from.
     * @returns {number} The height of the tree.
     * 
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * 
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.getHeight(tree.getRoot())); // Output: 1
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
     * Returns the root node of the binary tree.
     * 
     * @returns {Node<T> | null} The root node of the tree, or null if the tree is empty.
     * 
     * @complexity
     * Time complexity: O(1) - Constant time operation.
     * Space complexity: O(1) - Constant space operation.
     * 
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.getRoot()?.get()); // Output: 10
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
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.getSize()); // Output: 2
     */
    public getSize(): number {
        return this._size;
    }

    /**
     * Inserts a value into the binary tree.
     * @param {T} val - The value to insert.
     * @returns {number} The new size of the tree.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(1) - Constant space operation.
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.getSize()); // Output: 2
     */
    public insert(val: T): number {
        const node: Node<T> = new Node<T>(val);
        if (this._root == null) {
            this._root = node;
        } else {
            const queue: Node<T>[] = [this._root as Node<T>];

            while (queue.length > 0) {
                const current: Node<T> = queue.shift() as Node<T>;

                if (current.getLeftChild() === null) {
                    node.setParent(current);
                    current.setLeftChild(node);
                    break;
                } else {
                    queue.push(current.getLeftChild() as Node<T>);
                }

                if (current.getRightChild() === null) {
                    node.setParent(current);
                    current.setRightChild(node);
                    break;
                } else {
                    queue.push(current.getRightChild() as Node<T>);
                }
            }
        }
        this._size++;
        return this._size;
    }

    /**
     * Checks if the binary tree is balanced.
     * @returns {boolean} True if the tree is balanced, false otherwise.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * console.log(tree.isBalanced()); // Output: true
     */
    public isBalanced(): boolean {
        const checkHeight: (node: Node<T> | null) => number = (node: Node<T> | null): number => {
            if (node === null) return -1;

            const leftHeight: number = checkHeight(node.getLeftChild());
            const rightHeight: number = checkHeight(node.getRightChild());

            if (leftHeight === -2 || rightHeight === -2 || Math.abs(leftHeight - rightHeight) > 1) {
                return -2;
            }

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return checkHeight(this._root) !== -2;
    }

    /**
     * Checks if the binary tree is complete.
     * @returns {boolean} True if the tree is complete, false otherwise.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(n) - Where n is the number of nodes in the tree.
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.isComplete()); // Output: true
     */
    public isComplete(): boolean {
        if (this._root === null) {
            return true;
        }

        const queue: (Node<T> | null)[] = [this._root];
        let flag: boolean = false;

        while (queue.length > 0) {
            const current: Node<T> | null = queue.shift() as Node<T> | null;

            if (current === null) {
                flag = true;
            } else {
                if (flag) {
                    return false;
                }

                queue.push(current.getLeftChild());
                queue.push(current.getRightChild());
            }
        }

        return true;
    }

    /**
     * Checks if the binary tree is full.
     * @returns {boolean} True if the tree is full, false otherwise.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(n) - Where n is the number of nodes in the tree.
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * console.log(tree.isFull()); // Output: false
     */
    public isFull(): boolean {
        if (this._root === null) {
            return true;
        }

        const queue: Node<T>[] = [this._root as Node<T>];

        while (queue.length > 0) {
            const current: Node<T> = queue.shift() as Node<T>;
            const left: Node<T> | null = current.getLeftChild();
            const right: Node<T> | null = current.getRightChild();

            if ((left !== null && right === null) || (left === null && right !== null)) {
                return false;
            }

            if (left !== null) {
                queue.push(left);
            }
            if (right !== null) {
                queue.push(right);
            }
        }

        return true;
    }

    /**
     * Sets the value of a node with the given value.
     * @param {T} target - The value to find.
     * @param {T} newVal - The new value to set.
     * @returns {boolean} True if the node was found and updated, false otherwise.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * console.log(tree.setNode(10, 20)); // Output: true
     * console.log(tree.getNode(20)?.get()); // Output: 20
     * console.log(tree.getNode(10)); // Output: null
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
     * Implements the iterable interface for the binary tree.
     * @returns {IterableIterator<T>} - An iterator for the binary tree.
     * @complexity
     * Time complexity: O(n) - Where n is the number of nodes in the tree.
     * Space complexity: O(h) - Where h is the height of the tree.
     * @example
     * const tree: BinaryTree<number> = new BinaryTree<number>((a: number, b: number) => a - b);
     * tree.insert(10);
     * tree.insert(5);
     * tree.insert(15);
     * for (const value of tree) {
     *     console.log(value); // Output: 5, 10, 15 (in-order traversal)
     * }
     */
    *[Symbol.iterator](): IterableIterator<T> {
        yield* this.inOrderTraversalGenerator(this._root);
    }

    /**
     * Generator for in-order traversal.
     * @private
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
