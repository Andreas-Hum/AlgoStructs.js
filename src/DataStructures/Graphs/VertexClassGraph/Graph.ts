import WeightedGraphVertex from "../Vertices/Weighted/GraphVertex";
import UnweightedGraphVertex from "../Vertices/Unweighted/GraphVertex";

type Edge<T> = {
    vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>;
    weights?: number[];
};

export default class Graph<T> {
    private _vertices: Set<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>;
    private _isWeighted: boolean;
    private _isUndirected: boolean;

    /**
     * Creates an instance of Graph.
     * @param {boolean} [isWeighted=false] - Indicates if the graph is weighted.
     * @param {boolean} [isUndirected=false] - Indicates if the graph is undirected.
     * @example
     * // Create a directed, unweighted graph
     * const directedUnweightedGraph: Graph<string> = new Graph<string>();
     * 
     * // Create an undirected, unweighted graph
     * const undirectedUnweightedGraph: Graph<string> = new Graph<string>(false, true);
     * 
     * // Create a directed, weighted graph
     * const directedWeightedGraph: Graph<string> = new Graph<string>(true, false);
     * 
     * // Create an undirected, weighted graph
     * const undirectedWeightedGraph: Graph<string> = new Graph<string>(true, true); 
     */
    constructor(isWeighted: boolean = false, isUndirected: boolean = false) {
        this._vertices = new Set();
        this._isWeighted = isWeighted;
        this._isUndirected = isUndirected;
    }

    /**
     * Adds a vertex to the graph.
     * @param {T} val - The value of the vertex.
     * @returns {WeightedGraphVertex<T> | UnweightedGraphVertex<T>} The created vertex.
     * @complexity
     * Time complexity: O(1) - Constant time operation
     * Space complexity: O(1) - Constant space operation
     */
    public addVertex(val: T): WeightedGraphVertex<T> | UnweightedGraphVertex<T> {
        const vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T> = this._isWeighted ? new WeightedGraphVertex(val) : new UnweightedGraphVertex(val);
        this._vertices.add(vertex);
        return vertex;
    }

    /**
     * Removes a vertex from the graph.
     * @param {WeightedGraphVertex<T> | UnweightedGraphVertex<T>} vertex - The vertex to remove.
     * @returns {boolean} True if the vertex was removed, otherwise false.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(1) - Constant space operation
     */
    public removeVertex(vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>): boolean {
        if (!this._vertices.has(vertex)) {
            return false;
        }
        this._vertices.delete(vertex);
        vertex.getEdges().forEach((edge) => {
            if (this._isWeighted) {
                (edge.vertex as WeightedGraphVertex<T>).removeEdge(vertex as WeightedGraphVertex<T>, 0, this._isUndirected);
            } else {
                (edge as UnweightedGraphVertex<T>).removeEdge(vertex as UnweightedGraphVertex<T>, this._isUndirected);
            }
        });
        return true;
    }

    /**
     * Adds an edge between two vertices in the graph.
     * @param {WeightedGraphVertex<T> | UnweightedGraphVertex<T>} vertex1 - The first vertex.
     * @param {WeightedGraphVertex<T> | UnweightedGraphVertex<T>} vertex2 - The second vertex.
     * @param {number} [weight=0] - The weight of the edge (only for weighted graphs).
     * @returns {boolean} True if the edge was added, otherwise false.
     * @complexity
     * Time complexity: O(1) - Constant time operation
     * Space complexity: O(1) - Constant space operation
     */
    public addEdge(vertex1: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, vertex2: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, weight: number = 0): boolean {
        if (this._isWeighted) {
            return (vertex1 as WeightedGraphVertex<T>).addEdge(vertex2 as WeightedGraphVertex<T>, weight, this._isUndirected);
        } else {
            return (vertex1 as UnweightedGraphVertex<T>).addEdge(vertex2 as UnweightedGraphVertex<T>, this._isUndirected);
        }
    }

    /**
     * Removes an edge between two vertices in the graph.
     * @param {WeightedGraphVertex<T> | UnweightedGraphVertex<T>} vertex1 - The first vertex.
     * @param {WeightedGraphVertex<T> | UnweightedGraphVertex<T>} vertex2 - The second vertex.
     * @param {number} [weight=0] - The weight of the edge (only for weighted graphs).
     * @returns {boolean} True if the edge was removed, otherwise false.
     * @complexity
     * Time complexity: O(1) - Constant time operation
     * Space complexity: O(1) - Constant space operation
     */
    public removeEdge(vertex1: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, vertex2: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, weight: number = 0): boolean {
        if (this._isWeighted) {
            return (vertex1 as WeightedGraphVertex<T>).removeEdge(vertex2 as WeightedGraphVertex<T>, weight, this._isUndirected);
        } else {
            return (vertex1 as UnweightedGraphVertex<T>).removeEdge(vertex2 as UnweightedGraphVertex<T>, this._isUndirected);
        }
    }

    /**
     * Gets all vertices in the graph.
     * @returns {Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>} An array of all vertices in the graph.
     * @complexity
     * Time complexity: O(V) - Where V is the number of vertices.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public getVertices(): Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> {
        return Array.from(this._vertices);
    }

    /**
     * Gets all edges of a vertex in the graph.
     * @param {WeightedGraphVertex<T> | UnweightedGraphVertex<T>} vertex - The vertex to get edges for.
     * @returns {Array<{ vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, weights?: number[] }>} An array of edges.
     * @complexity
     * Time complexity: O(E) - Where E is the number of edges.
     * Space complexity: O(E) - Where E is the number of edges;
     */
    public getEdges(vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>): Array<{ vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, weights?: number[] }> {
        if (this._isWeighted) {
            return (vertex as WeightedGraphVertex<T>).getEdges().map(edge => ({ vertex: edge.vertex, weights: edge.weights }));
        } else {
            return (vertex as UnweightedGraphVertex<T>).getEdges().map(edge => ({ vertex: edge }));
        }
    }
}
