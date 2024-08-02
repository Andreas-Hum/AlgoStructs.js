/**
 * Represents a node in a weighted graph.
 * 
 * @template T - The type of the value stored in the node.
 */
export default class GraphNode<T> {
    private _val: T;
    private _edges: Map<GraphNode<T>, number[]>;

    /**
     * Creates an instance of a GraphNode.
     * 
     * @param {T} val - The value to store in the node.
     */
    constructor(val: T) {
        this._val = val;
        this._edges = new Map();
    }

    /**
     * Adds a directed or undirected edge from this node to another node with a specified weight.
     * 
     * @param {GraphNode<T>} node - The node to connect to.
     * @param {number} weight - The weight of the edge.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was added, false if it already existed.
     */
    public addEdge(node: GraphNode<T>, weight: number, undirected: boolean = false): boolean {
        if (!this._edges.has(node)) {
            this._edges.set(node, []);
        }
        const weights = this._edges.get(node)!;
        if (weights.includes(weight)) {
            return false;
        }
        weights.push(weight);

        if (undirected) {
            node.addEdge(this, weight, false);
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
     * @returns {Array<{node: GraphNode<T>, weights: number[]}>} - An array of nodes and their weights connected to this node.
     */
    public getEdges(): Array<{ node: GraphNode<T>, weights: number[] }> {
        return Array.from(this._edges.entries()).map(([node, weights]) => ({ node, weights }));
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
     * @param {number} weight - The weight of the edge to remove.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was removed, false if it did not exist.
     */
    public removeEdge(node: GraphNode<T>, weight: number, undirected: boolean = false): boolean {
        if (!this._edges.has(node)) {
            return false;
        }
        const weights: number[] = this._edges.get(node)!;
        const weightIndex: number = weights.indexOf(weight);
        if (weightIndex === -1) {
            return false;
        }
        weights.splice(weightIndex, 1);
        if (weights.length === 0) {
            this._edges.delete(node);
        }

        if (undirected) {
            node.removeEdge(this, weight, false);
        }

        return true;
    }

    /**
     * Sets the edges of this node.
     * 
     * @param {Array<{node: GraphNode<T>, weights: number[]}>} edges - An array of nodes and their weights to set as edges.
     * @param {boolean} [undirected=false] - Whether the edges are undirected.
     */
    public setEdges(edges: Array<{ node: GraphNode<T>, weights: number[] }>, undirected: boolean = false): void {
        this._edges.clear();
        for (const { node, weights } of edges) {
            for (const weight of weights) {
                this.addEdge(node, weight, undirected);
            }
        }
    }

    /**
     * Sets a directed or undirected edge from this node to another node.
     * If the edge already exists, it replaces the existing edge with the new node.
     * 
     * @param {GraphNode<T>} oldNode - The existing node to be replaced.
     * @param {GraphNode<T>} newNode - The new node to connect to.
     * @param {number} weight - The weight of the new edge.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     */
    public setEdge(oldNode: GraphNode<T>, newNode: GraphNode<T>, weight: number, undirected: boolean = false): boolean {
        if (!this._edges.has(oldNode)) {
            return false;
        }
        this._edges.delete(oldNode);
        this.addEdge(newNode, weight, undirected);

        if (undirected) {
            oldNode.removeEdge(this, weight, false);
            newNode.addEdge(this, weight, false);
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
     * @returns {Iterator<[GraphNode<T>, number[]]>} - An iterator over the edges and their weights.
     */
    public [Symbol.iterator](): Iterator<[GraphNode<T>, number[]]> {
        return this._edges.entries();
    }
}
