/**
 * Represents a node in a binary tree.
 * 
 * @template T - The type of the value stored in the node.
 */
export default class Node<T> {
    private _val: T;
    private _parent: Node<T> | null;
    private _right_child: Node<T> | null;
    private _left_child: Node<T> | null;

    /**
     * Creates an instance of a Node.
     * 
     * @param {T} val - The value to store in the node.
     */
    constructor(val: T) {
        this._val = val;
        this._left_child = null;
        this._right_child = null;
        this._parent = null;
    }

    /**
     * Sets the value of the node.do
     * 
     * @param {T} val - The new value to store in the node.
     */
    public set(val: T): void {
        this._val = val;
    }

    /**
     * Gets the value of the node.
     * 
     * @returns {T} - The value stored in the node.
     */
    public get(): T {
        return this._val;
    }

    /**
     * Sets the right child node.
     * 
     * @param {Node<T> | null} node - The node to set as the right child.
     */
    public setRightChild(node: Node<T> | null): void {
        this._right_child = node;
    }

    /**
     * Sets the left child node.
     * 
     * @param {Node<T> | null} node - The node to set as the left child.
     */
    public setLeftChild(node: Node<T> | null): void {
        this._left_child = node;
    }

    /**
     * Sets the parent node.
     * 
     * @param {Node<T> | null} node - The node to set as the parent.
     */
    public setParent(node: Node<T> | null): void {
        this._parent = node;
    }

    /**
     * Gets the right child node.
     * 
     * @returns {Node<T> | null} - The right child node, or null if there is no right child.
     */
    public getRightChild(): Node<T> | null {
        return this._right_child;
    }

    /**
     * Gets the left child node.
     * 
     * @returns {Node<T> | null} - The left child node, or null if there is no left child.
     */
    public getLeftChild(): Node<T> | null {
        return this._left_child;
    }

    /**
     * Gets the parent node.
     * 
     * @returns {Node<T> | null} - The parent node, or null if there is no parent.
     */
    public getParent(): Node<T> | null {
        return this._parent;
    }
}