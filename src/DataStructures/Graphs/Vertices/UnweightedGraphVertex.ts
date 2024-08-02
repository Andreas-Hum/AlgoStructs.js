import type {
    UnweightedAddEdgeOptions,
    UnweightedRemoveEdgeOptions,
    UnweightedSetEdgesOptions,
    UnweightedSetEdgeOptions
} from "../Options/VertexGraphOptions/UnweightedOptions";

/**
 * Represents a vertex in an unweighted graph.
 * 
 * @template T - The type of the value stored in the vertex.
 */
export default class UnweightedGraphVertex<T> {
    private _val: T;
    private _edges: Set<UnweightedGraphVertex<T>>;
    /**
     * Creates an instance of a UnweightedGraphVertex.
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
     * @param {UnweightedAddEdgeOptions<T>} options - The options for adding an edge.
     * @returns {boolean} - True if the edge was added, false if it already existed.
     */
    public addEdge(options: UnweightedAddEdgeOptions<T>): boolean {
        const { vertex, undirected = false } = options;
        if (this._edges.has(vertex)) {
            return false;
        }
        this._edges.add(vertex);

        if (undirected) {
            vertex.addEdge({ vertex: this, undirected: false });
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
     * @returns {UnweightedGraphVertex<T>[]} - An array of vertices connected to this vertex.
     */
    public getEdges(): UnweightedGraphVertex<T>[] {
        return Array.from(this._edges);
    }

    /**
     * Checks if there is an edge between this vertex and another vertex.
     * 
     * @param {UnweightedGraphVertex<T>} vertex - The vertex to check for an edge.
     * @returns {boolean} - True if an edge exists, false otherwise.
     */
    public hasEdge(vertex: UnweightedGraphVertex<T>): boolean {
        return this._edges.has(vertex);
    }

    /**
     * Removes the directed or undirected edge from this vertex to another vertex.
     * 
     * @param {UnweightedRemoveEdgeOptions<T>} options - The options for removing an edge.
     * @returns {boolean} - True if the edge was removed, false if it did not exist.
     */
    public removeEdge(options: UnweightedRemoveEdgeOptions<T>): boolean {
        const { vertex, undirected = false } = options;
        if (!this._edges.has(vertex)) {
            return false;
        }
        this._edges.delete(vertex);

        if (undirected) {
            vertex.removeEdge({ vertex: this, undirected: false });
        }

        return true;
    }

    /**
     * Sets the edges of this vertex.
     * 
     * @param {UnweightedSetEdgesOptions<T>} options - The options for setting the edges.
     */
    public setEdges(options: UnweightedSetEdgesOptions<T>): void {
        const { edges, undirected = false } = options;
        this._edges.clear();
        for (const vertex of edges) {
            this.addEdge({ vertex, undirected });
        }
    }

    /**
     * Sets a directed or undirected edge from this vertex to another vertex.
     * If the edge already exists, it replaces the existing edge with the new vertex.
     * 
     * @param {UnweightedSetEdgeOptions<T>} options - The options for setting an edge.
     * @returns {boolean} - True if the edge was replaced, false if the old vertex did not exist.
     */
    public setEdge(options: UnweightedSetEdgeOptions<T>): boolean {
        const { oldVertex, newVertex, undirected = false } = options;
        if (!this._edges.has(oldVertex)) {
            return false;
        }
        this._edges.delete(oldVertex);
        this._edges.add(newVertex);

        if (undirected) {
            oldVertex.removeEdge({ vertex: this, undirected: false });
            newVertex.addEdge({ vertex: this, undirected: false });
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
     * @returns {Iterator<UnweightedGraphVertex<T>>} - An iterator over the edges.
     */
    public [Symbol.iterator](): Iterator<UnweightedGraphVertex<T>> {
        return this._edges.values();
    }
}
