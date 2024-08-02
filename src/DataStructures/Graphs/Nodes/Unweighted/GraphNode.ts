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
     * Gets the value of the node.
     * 
     * @returns {T} - The value stored in the node.
     */
    public get(): T {
        return this._val;
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
     * Checks if there is an edge between this node and another node.
     * 
     * @param {GraphNode<T>} node - The node to check for an edge.
     * @returns {boolean} - True if an edge exists, false otherwise.
     */
    public hasEdge(node: GraphNode<T>): boolean {
        return this._edges.has(node);
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
     * Sets the edges of this node.
     * 
     * @param {GraphNode<T>[]} nodes - An array of nodes to set as edges.
     * @param {boolean} [undirected=false] - Whether the edges are undirected.
     */
    public setEdges(nodes: GraphNode<T>[], undirected: boolean = false): void {
        this._edges.clear();
        for (const node of nodes) {
            this.addEdge(node, undirected);
        }
    }

    /**
     * Sets a directed or undirected edge from this node to another node.
     * If the edge already exists, it replaces the existing edge with the new node.
     * 
     * @param {GraphNode<T>} oldNode - The existing node to be replaced.
     * @param {GraphNode<T>} newNode - The new node to connect to.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was replaced, false if the old node did not exist.
     */
    public setEdge(oldNode: GraphNode<T>, newNode: GraphNode<T>, undirected: boolean = false): boolean {
        if (!this._edges.has(oldNode)) {
            return false;
        }
        this._edges.delete(oldNode);
        this._edges.add(newNode);

        if (undirected) {
            oldNode.removeEdge(this, false);
            newNode.addEdge(this, false);
        }

        return true;
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
     * Returns an iterator over the edges of this node.
     * 
     * @returns {Iterator<GraphNode<T>>} - An iterator over the edges.
     */
    public [Symbol.iterator](): Iterator<GraphNode<T>> {
        return this._edges.values();
    }
}