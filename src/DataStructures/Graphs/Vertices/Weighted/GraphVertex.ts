/**
 * Represents a vertex in a weighted graph.
 * 
 * @template T - The type of the value stored in the vertex.
 */
export default class GraphVertex<T> {
    private _val: T;
    private _edges: Map<GraphVertex<T>, number[]>;

    /**
     * Creates an instance of a GraphVertex.
     * 
     * @param {T} val - The value to store in the vertex.
     */
    constructor(val: T) {
        this._val = val;
        this._edges = new Map();
    }

    /**
     * Adds a directed or undirected edge from this vertex to another vertex with a specified weight.
     * 
     * @param {GraphVertex<T>} vertex - The vertex to connect to.
     * @param {number} weight - The weight of the edge.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was added, false if it already existed.
     */
    public addEdge(vertex: GraphVertex<T>, weight: number, undirected: boolean = false): boolean {
        if (!this._edges.has(vertex)) {
            this._edges.set(vertex, []);
        }
        const weights = this._edges.get(vertex)!;
        if (weights.includes(weight)) {
            return false;
        }
        weights.push(weight);

        if (undirected) {
            vertex.addEdge(this, weight, false);
        }
        return true;
    }

    /**
     * Gets the value of the vertex.
     * 
     * @returns {T} - The value stored in the vertex.
     */
    public get(): T {
        return this._val;
    }

    /**
     * Gets all edges connected to this vertex.
     * 
     * @returns {Array<{vertex: GraphVertex<T>, weights: number[]}>} - An array of vertices and their weights connected to this vertex.
     */
    public getEdges(): Array<{ vertex: GraphVertex<T>, weights: number[] }> {
        return Array.from(this._edges.entries()).map(([vertex, weights]) => ({ vertex, weights }));
    }

    /**
     * Checks if there is an edge between this vertex and another vertex.
     * 
     * @param {GraphVertex<T>} vertex - The vertex to check for an edge.
     * @returns {boolean} - True if an edge exists, false otherwise.
     */
    public hasEdge(vertex: GraphVertex<T>): boolean {
        return this._edges.has(vertex);
    }

    /**
     * Removes the directed or undirected edge from this vertex to another vertex.
     * 
     * @param {GraphVertex<T>} vertex - The vertex to disconnect from.
     * @param {number} weight - The weight of the edge to remove.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was removed, false if it did not exist.
     */
    public removeEdge(vertex: GraphVertex<T>, weight: number, undirected: boolean = false): boolean {
        if (!this._edges.has(vertex)) {
            return false;
        }
        const weights: number[] = this._edges.get(vertex)!;
        const weightIndex: number = weights.indexOf(weight);
        if (weightIndex === -1) {
            return false;
        }
        weights.splice(weightIndex, 1);
        if (weights.length === 0) {
            this._edges.delete(vertex);
        }

        if (undirected) {
            vertex.removeEdge(this, weight, false);
        }

        return true;
    }

    /**
     * Sets the edges of this vertex.
     * 
     * @param {Array<{vertex: GraphVertex<T>, weights: number[]}>} edges - An array of vertices and their weights to set as edges.
     * @param {boolean} [undirected=false] - Whether the edges are undirected.
     */
    public setEdges(edges: Array<{ vertex: GraphVertex<T>, weights: number[] }>, undirected: boolean = false): void {
        this._edges.clear();
        for (const { vertex, weights } of edges) {
            for (const weight of weights) {
                this.addEdge(vertex, weight, undirected);
            }
        }
    }

    /**
     * Sets a directed or undirected edge from this vertex to another vertex.
     * If the edge already exists, it replaces the existing edge with the new vertex.
     * 
     * @param {GraphVertex<T>} oldVertex - The existing vertex to be replaced.
     * @param {GraphVertex<T>} newVertex - The new vertex to connect to.
     * @param {number} weight - The weight of the new edge.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     */
    public setEdge(oldVertex: GraphVertex<T>, newVertex: GraphVertex<T>, weight: number, undirected: boolean = false): boolean {
        if (!this._edges.has(oldVertex)) {
            return false;
        }
        this._edges.delete(oldVertex);
        this.addEdge(newVertex, weight, undirected);

        if (undirected) {
            oldVertex.removeEdge(this, weight, false);
            newVertex.addEdge(this, weight, false);
        }

        return true;
    }

    /**
     * Sets the value of the vertex.
     * 
     * @param {T} val - The new value to store in the vertex.
     */
    public set(val: T): void {
        this._val = val;
    }

    /**
     * Returns an iterator over the edges of this vertex.
     * 
     * @returns {Iterator<[GraphVertex<T>, number[]]>} - An iterator over the edges and their weights.
     */
    public [Symbol.iterator](): Iterator<[GraphVertex<T>, number[]]> {
        return this._edges.entries();
    }
}
