import Node from "./BinaryTreeNode";


/**
 * Represents a binary tree.
 * 
 * @template T - The type of elements in the tree.
 */
export default class BinaryTree<T> {
    private _root: Node<T> | null;
    private _size: number;
    private _compare: (a: T, b: T) => number;

    /**
     * Creates an instance of a binary tree.
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
     * const tree: BinaryTree<number> = new BinaryTree<number>(compareNumbers);
     */
    constructor(compare: (a: T, b: T) => number) {
        this._compare = compare;
        this._root = null;
        this._size = 0;
    }

    /**
     * Inserts a value into the binary tree.
     * @param {T} val - The value to insert.
     * @returns {number} The new size of the tree.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(1).
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
     * Deletes a value from the binary tree.
     * @param {T} val - The value to delete.
     * @returns {boolean} True if the value was deleted, false otherwise.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(n) - where n is the number of nodes in the tree.
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

    private _deleteRoot(): void {
        if (this._root === null) {
            return;
        }

        if (this._root.getLeftChild() === null && this._root.getRightChild() === null) {
            this._root = null;
        } else if (this._root.getLeftChild() === null) {
            this._root = this._root.getRightChild();
        } else if (this._root.getRightChild() === null) {
            this._root = this._root.getLeftChild();
        } else {
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

        this._size--;
    }

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
     * Gets the height of the binary tree.
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

        const left_height = this.getHeight(node.getLeftChild());
        const right_height = this.getHeight(node.getRightChild());

        return Math.max(left_height, right_height) + 1;
    }

    /**
     * Finds a node with the given value.
     * @param {T} target - The value to find.
     * @returns {Node<T> | null} The node with the given value, or null if not found.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(h) - where h is the height of the tree.
     */
    public find(target: T): Node<T> | null {
        return this._findNode(this._root, target);
    }

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
     * Checks if the binary tree is full.
     * @returns {boolean} True if the tree is full, false otherwise.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(n) - where n is the number of nodes in the tree.
     */
    public isFull(): boolean {
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
     * Checks if the binary tree is complete.
     * @returns {boolean} True if the tree is complete, false otherwise.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(n) - where n is the number of nodes in the tree.
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
     * Checks if the binary tree is balanced.
     * @returns {boolean} True if the tree is balanced, false otherwise.
     * @complexity
     * Time complexity: O(n) - where n is the number of nodes in the tree.
     * Space complexity: O(h) - where h is the height of the tree.
     */
    public isBalanced(): boolean {
        const checkHeight = (node: Node<T> | null): number => {
            if (node === null) return -1;

            const leftHeight = checkHeight(node.getLeftChild());
            const rightHeight = checkHeight(node.getRightChild());

            if (leftHeight === -2 || rightHeight === -2 || Math.abs(leftHeight - rightHeight) > 1) {
                return -2;
            }

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return checkHeight(this._root) !== -2;
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
        const traverse = (node: Node<T> | null): void => {
            if (node === null) return;
            traverse(node.getLeftChild());
            result.push(node.get());
            traverse(node.getRightChild());
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
        const traverse = (node: Node<T> | null): void => {
            if (node === null) return;
            result.push(node.get());
            traverse(node.getLeftChild());
            traverse(node.getRightChild());
        };
        traverse(this._root);
        return result;
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
        const traverse = (node: Node<T> | null): void => {
            if (node === null) return;
            traverse(node.getLeftChild());
            traverse(node.getRightChild());
            result.push(node.get());
        };
        traverse(this._root);
        return result;
    }
}