/**
 * Represents a vertex in an unweighted graph.
 * 
 * @template T - The type of the value stored in the vertex.
 */
export default class GraphVertex<T> {
    private _val: T;
    private _edges: Set<GraphVertex<T>>;

    /**
     * Creates an instance of a GraphVertex.
     * 
     * @param {T} val - The value to store in the vertex.
     */
    constructor(val: T) {
        this._val = val;
        this._edges = new Set();
    }

    /**
     * Adds a directed or undirected edge from this vertex to another vertex.
     * 
     * @param {GraphVertex<T>} vertex - The vertex to connect to.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was added, false if it already existed.
     */
    public addEdge(vertex: GraphVertex<T>, undirected: boolean = false): boolean {
        if (this._edges.has(vertex)) {
            return false;
        }
        this._edges.add(vertex);

        if (undirected) {
            vertex.addEdge(this, false);
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
     * @returns {GraphVertex<T>[]} - An array of vertices connected to this vertex.
     */
    public getEdges(): GraphVertex<T>[] {
        return Array.from(this._edges);
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
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was removed, false if it did not exist.
     */
    public removeEdge(vertex: GraphVertex<T>, undirected: boolean = false): boolean {
        if (!this._edges.has(vertex)) {
            return false;
        }
        this._edges.delete(vertex);

        if (undirected) {
            vertex.removeEdge(this, false);
        }

        return true;
    }

    /**
     * Sets the edges of this vertex.
     * 
     * @param {GraphVertex<T>[]} vertices - An array of vertices to set as edges.
     * @param {boolean} [undirected=false] - Whether the edges are undirected.
     */
    public setEdges(vertices: GraphVertex<T>[], undirected: boolean = false): void {
        this._edges.clear();
        for (const vertex of vertices) {
            this.addEdge(vertex, undirected);
        }
    }

    /**
     * Sets a directed or undirected edge from this vertex to another vertex.
     * If the edge already exists, it replaces the existing edge with the new vertex.
     * 
     * @param {GraphVertex<T>} oldVertex - The existing vertex to be replaced.
     * @param {GraphVertex<T>} newVertex - The new vertex to connect to.
     * @param {boolean} [undirected=false] - Whether the edge is undirected.
     * @returns {boolean} - True if the edge was replaced, false if the old vertex did not exist.
     */
    public setEdge(oldVertex: GraphVertex<T>, newVertex: GraphVertex<T>, undirected: boolean = false): boolean {
        if (!this._edges.has(oldVertex)) {
            return false;
        }
        this._edges.delete(oldVertex);
        this._edges.add(newVertex);

        if (undirected) {
            oldVertex.removeEdge(this, false);
            newVertex.addEdge(this, false);
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
     * @returns {Iterator<GraphVertex<T>>} - An iterator over the edges.
     */
    public [Symbol.iterator](): Iterator<GraphVertex<T>> {
        return this._edges.values();
    }
}
