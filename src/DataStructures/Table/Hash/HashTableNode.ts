/**
 * Represents a node in a hash table.
 * @template K - The type of the key.
 * @template V - The type of the value.
 */
export default class Node<K, V> {
    private _key: K;
    private _value: V;
    private _next: Node<K, V> | null;

    /**
     * Creates an instance of Node.
     * @param {K} key - The key associated with the node.
     * @param {V} value - The value associated with the node.
     * @param {Node<K, V> | null} [next=null] - The next node in the linked list (default is null).
     */
    constructor(key: K, value: V, next: Node<K, V> | null = null) {
        this._key = key;
        this._value = value;
        this._next = next;
    }

    /**
     * Sets the key of the node.
     * @param {K} key - The new key to store in the node.
     */
    public setKey(key: K): void {
        this._key = key;
    }

    /**
     * Gets the key of the node.
     * @returns {K} - The key stored in the node.
     */
    public getKey(): K {
        return this._key;
    }

    /**
     * Sets the value of the node.
     * @param {V} value - The new value to store in the node.
     */
    public setValue(value: V): void {
        this._value = value;
    }

    /**
     * Gets the value of the node.
     * @returns {V} - The value stored in the node.
     */
    public getValue(): V {
        return this._value;
    }

    /**
     * Sets the next node in the list.
     * @param {Node<K, V> | null} node - The node to set as the next node.
     */
    public setNext(node: Node<K, V> | null): void {
        this._next = node;
    }

    /**
     * Gets the next node in the list.
     * @returns {Node<K, V> | null} - The next node in the list, or null if there is no next node.
     */
    public getNext(): Node<K, V> | null {
        return this._next;
    }
}