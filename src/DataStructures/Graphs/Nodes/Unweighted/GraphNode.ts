/**
 * Represents a node in an unweighted graph.
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
     * Adds a directed or undirected edge from this node to another node.
     * 
     * @param {GraphNode<T>} node - The node to connect to.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was added, false if it already existed.
     */
    public addEdge(node: GraphNode<T>, undirected: boolean = false): boolean {
        if (this._edges.has(node)) {
            return false;
        }
        this._edges.add(node);

        if (undirected) {
            node.addEdge(this, false);
        }

        return true;
    }

    /**
     * Removes the directed or undirected edge from this node to another node.
     * 
     * @param {GraphNode<T>} node - The node to disconnect from.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was removed, false if it did not exist.
     */
    public removeEdge(node: GraphNode<T>, undirected: boolean = false): boolean {
        if (!this._edges.has(node)) {
            return false;
        }
        this._edges.delete(node);

        if (undirected) {
            node.removeEdge(this, false);
        }

        return true;
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
     * Gets the value of the node.
     * 
     * @returns {T} - The value stored in the node.
     */
    public getValue(): T {
        return this._val;
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
}