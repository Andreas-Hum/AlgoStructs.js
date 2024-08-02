/**
 * Represents a node in an weighted graph.
 * 
 * @template T - The type of the value stored in the node.
 */
export default class GraphNode<T> {
    private _val: T;
    private _edges: Set<GraphNode<T>>;

    /**
     * Creates an instance of a GraphNode.
     * 
     * @param {T} val - The value to store in the node.
     */
    constructor(val: T) {
        this._val = val;
        this._edges = new Set();
    }

    /**
     * Adds an edge between this node and another node.
     * 
     * @param {GraphNode<T>} node - The node to connect to.
     * @returns {boolean} - True if the edge was added, false if it already existed.
     */
    public addEdge(node: GraphNode<T>): boolean {
        if (this._edges.has(node)) {
            return false;
        }
        this._edges.add(node);
        return true;
    }

    /**
     * Removes the edge between this node and another node.
     * 
     * @param {GraphNode<T>} node - The node to disconnect from.
     * @returns {boolean} - True if the edge was removed, false if it did not exist.
     */
    public removeEdge(node: GraphNode<T>): boolean {
        if (this._edges.has(node)) {
            this._edges.delete(node);
            return true;
        }
        return false;
    }

    /**
     * Gets the edge between this node and another node.
     * 
     * @param {GraphNode<T>} node - The node to check for an edge.
     * @returns {GraphNode<T> | null} - The node if an edge exists, null otherwise.
     */
    public getEdge(node: GraphNode<T>): GraphNode<T> | null {
        if (this._edges.has(node)) {
            return node;
        }
        return null;
    }

    /**
     * Gets all edges connected to this node.
     * 
     * @returns {GraphNode<T>[]} - An array of nodes connected to this node.
     */
    public getEdges(): GraphNode<T>[] {
        return Array.from(this._edges);
    }

    /**
     * Sets the value of the node.
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
     * Gets the degree of the node (number of edges).
     * 
     * @returns {number} - The number of edges connected to this node.
     */
    public degree(): number {
        return this._edges.size;
    }

    /**
     * Checks if there is an edge between this node and another node.
     * 
     * @param {GraphNode<T>} node - The node to check for an edge.
     * @returns {boolean} - True if an edge exists, false otherwise.
     */
    public hasEdge(node: GraphNode<T>): boolean {
        return this._edges.has(node);
    }

    /**
     * Clears all edges from this node.
     */
    public clearEdges(): void {
        this._edges.clear();
    }
}