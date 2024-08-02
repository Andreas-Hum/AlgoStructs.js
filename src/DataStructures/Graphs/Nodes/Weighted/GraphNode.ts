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
     * Adds a directed or undirected edge from this node to another node with a weight.
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
        this._edges.get(node)!.push(weight);

        if (undirected) {
            node.addEdge(this, weight, false);
        }

        return true;
    }

    /**
     * Removes a directed or undirected edge from this node to another node with a specific weight.
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
        const index: number = weights.indexOf(weight);
        if (index === -1) {
            return false;
        }
        weights.splice(index, 1);
        if (weights.length === 0) {
            this._edges.delete(node);
        }

        if (undirected) {
            node.removeEdge(this, weight, false);
        }

        return true;
    }

    /**
     * Gets all edges connected to this node.
     * 
     * @returns {Array<{node: GraphNode<T>, weights: number[]}>} - An array of nodes connected to this node with their weights.
     */
    public getEdges(): Array<{ node: GraphNode<T>, weights: number[] }> {
        return Array.from(this._edges.entries()).map(([node, weights]) => ({ node, weights }));
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
        return Array.from(this._edges.values()).reduce((sum, weights) => sum + weights.length, 0);
    }

    /**
     * Checks if there is an edge between this node and another node with a specific weight.
     * 
     * @param {GraphNode<T>} node - The node to check for an edge.
     * @param {number} weight - The weight of the edge to check for.
     * @returns {boolean} - True if an edge exists, false otherwise.
     */
    public hasEdge(node: GraphNode<T>, weight: number): boolean {
        return this._edges.has(node) && this._edges.get(node)!.includes(weight);
    }

    /**
     * Clears all edges from this node.
     */
    public clearEdges(): void {
        this._edges.clear();
    }

    /**
     * Sets the weight of the edge between this node and another node.
     * 
     * @param {GraphNode<T>} node - The node to set the edge weight for.
     * @param {number} oldWeight - The old weight of the edge.
     * @param {number} newWeight - The new weight of the edge.
     * @returns {boolean} - True if the weight was set, false if the edge does not exist.
     */
    public setWeight(node: GraphNode<T>, oldWeight: number, newWeight: number): boolean {
        if (!this._edges.has(node)) {
            return false;
        }
        const weights: number[] = this._edges.get(node)!;
        const index: number = weights.indexOf(oldWeight);
        if (index === -1) {
            return false;
        }
        weights[index] = newWeight;
        return true;
    }

    /**
     * Gets the weights of the edges between this node and another node.
     * 
     * @param {GraphNode<T>} node - The node to get the edge weights for.
     * @returns {number[] | null} - The weights of the edges, or null if no edges exist.
     */
    public getWeights(node: GraphNode<T>): number[] | null {
        return this._edges.get(node) ?? null;
    }
}