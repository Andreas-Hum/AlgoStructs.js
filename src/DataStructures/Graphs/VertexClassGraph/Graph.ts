import WeightedGraphVertex from "../Vertices/Weighted/GraphVertex";
import UnweightedGraphVertex from "../Vertices/Unweighted/GraphVertex";


import type {
    GraphOptions,
    EdgeOptions,
    SearchOptions,
    TraverseOptions,
    CreateRandomGraphOptions,
} from "../Options/Options";


export default class Graph<T> {
    private _vertices: Set<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>;
    private _isWeighted: boolean;
    private _isUndirected: boolean;
    private _compare: (a: T, b: T) => number;

    /**
     * Creates an instance of Graph.
     * @param {GraphOptions<T>} options - Configuration options for the graph.
     * @remarks
     * The comparison function should return:
     * - A negative number if the first argument is less than the second.
     * - Zero if the first argument is equal to the second.
     * - A positive number if the first argument is greater than the second.
     *
     * @example
     * const compareNumbers: (a: number, b: number) => number = (a: number, b: number) => a - b;
     * const graph: Graph<number> = new Graph<number>({ isWeighted: false, isUndirected: false, compare: compareNumbers });
     */
    constructor(options: GraphOptions<T>) {
        this._vertices = new Set();
        this._isWeighted = options.isWeighted ?? false;
        this._isUndirected = options.isUndirected ?? false;
        this._compare = options.compare;
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
        vertex.getEdges().forEach((edge: any) => {
            if (this._isWeighted) {
                const weightedEdge: {
                    vertex: WeightedGraphVertex<T>;
                    weights: number[];
                } = edge as { vertex: WeightedGraphVertex<T>, weights: number[] };
                weightedEdge.vertex.removeEdge({ vertex: vertex as WeightedGraphVertex<T>, weight: 0, undirected: this._isUndirected });
            } else {
                const unweightedEdge: UnweightedGraphVertex<T> = edge as UnweightedGraphVertex<T>;
                unweightedEdge.removeEdge({ vertex: vertex as UnweightedGraphVertex<T>, undirected: this._isUndirected });
            }
        });
        return true;
    }

    /**
     * Adds an edge between two vertices in the graph.
     * @param {EdgeOptions<T>} options - Options for adding an edge.
     * @returns {boolean} True if the edge was added, otherwise false.
     * @complexity
     * Time complexity: O(1) - Constant time operation
     * Space complexity: O(1) - Constant space operation
     */
    public addEdge(options: EdgeOptions<T>): boolean {
        const { vertex1, vertex2, weight = 0 } = options;
        if (this._isWeighted) {
            return (vertex1 as WeightedGraphVertex<T>).addEdge({ vertex: vertex2 as WeightedGraphVertex<T>, weight, undirected: this._isUndirected });
        } else {
            return (vertex1 as UnweightedGraphVertex<T>).addEdge({ vertex: vertex2 as UnweightedGraphVertex<T>, undirected: this._isUndirected });
        }
    }

    /**
     * Removes an edge between two vertices in the graph.
     * @param {EdgeOptions<T>} options - Options for removing an edge.
     * @returns {boolean} True if the edge was removed, otherwise false.
     * @complexity
     * Time complexity: O(1) - Constant time operation
     * Space complexity: O(1) - Constant space operation
     */
    public removeEdge(options: EdgeOptions<T>): boolean {
        const { vertex1, vertex2, weight = 0 } = options;
        if (this._isWeighted) {
            return (vertex1 as WeightedGraphVertex<T>).removeEdge({ vertex: vertex2 as WeightedGraphVertex<T>, weight, undirected: this._isUndirected });
        } else {
            return (vertex1 as UnweightedGraphVertex<T>).removeEdge({ vertex: vertex2 as UnweightedGraphVertex<T>, undirected: this._isUndirected });
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

    /**
     * Performs a depth-first search (DFS) starting from a given vertex.
     * @param {SearchOptions<T>} options - Options for the DFS.
     * @returns {Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> | boolean} An array of vertices in the order they were visited if returnPath is true, or a boolean indicating if the target is found.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public depthFirstSearch(options: SearchOptions<T>): Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> | boolean {
        const { startVertex, targetValue = null, returnPath = true } = options;
        const visited: Set<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> = new Set<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>();
        const result: Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> = [];
        let found: boolean = false;

        this._dfs(startVertex, targetValue, visited, result, found);
        return returnPath ? result : found;
    }

    private _dfs(
        vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>,
        targetValue: T | null,
        visited: Set<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>,
        result: Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>,
        found: boolean
    ): void {
        if (visited.has(vertex) || found) return;
        visited.add(vertex);
        result.push(vertex);

        if (targetValue !== null && this._compare(vertex.get(), targetValue) === 0) {
            found = true;
            return;
        }

        const edges: {
            vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>;
            weights?: number[];
        }[] = this.getEdges(vertex);
        for (const edge of edges) {
            this._dfs(edge.vertex, targetValue, visited, result, found);
            if (found) return;
        }
    }

    /**
     * Performs a breadth-first search (BFS) starting from a given vertex.
     * @param {SearchOptions<T>} options - Options for the BFS.
     * @returns {Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> | boolean} An array of vertices in the order they were visited if returnPath is true, or a boolean indicating if the target is found.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public breadthFirstSearch(options: SearchOptions<T>): Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> | boolean {
        const { startVertex, targetValue = null, returnPath = true } = options;
        if (this._isWeighted) {
            return this._weightedBFS(startVertex, targetValue, returnPath);
        } else {
            return this._unweightedBFS(startVertex, targetValue, returnPath);
        }
    }

    private _unweightedBFS(startVertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, targetValue: T | null, returnPath: boolean): Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> | boolean {
        const visited: Set<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> = new Set();
        const queue: Array<{ vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, path: Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> }> = [{ vertex: startVertex, path: [startVertex] }];
        const result: Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> = [];

        while (queue.length > 0) {
            const { vertex, path } = queue.shift()!;
            if (visited.has(vertex)) continue;
            visited.add(vertex);
            result.push(vertex);

            if (targetValue !== null && this._compare(vertex.get(), targetValue) === 0) {
                return returnPath ? path : true;
            }

            const edges = this.getEdges(vertex);
            for (const edge of edges) {
                if (!visited.has(edge.vertex)) {
                    queue.push({ vertex: edge.vertex, path: [...path, edge.vertex] });
                }
            }
        }

        return returnPath ? result : false;
    }

    private _weightedBFS(startVertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, targetValue: T | null, returnPath: boolean): Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> | boolean {
        const visited: Set<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> = new Set();
        const distances: Map<WeightedGraphVertex<T> | UnweightedGraphVertex<T>, number> = new Map();
        const queue: Array<{ vertex: WeightedGraphVertex<T> | UnweightedGraphVertex<T>, path: Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>, distance: number }> = [{ vertex: startVertex, path: [startVertex], distance: 0 }];
        const result: Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> = [];

        distances.set(startVertex, 0);

        while (queue.length > 0) {
            queue.sort((a, b) => a.distance - b.distance);
            const { vertex, path, distance } = queue.shift()!;
            if (visited.has(vertex)) continue;
            visited.add(vertex);
            result.push(vertex);

            if (targetValue !== null && this._compare(vertex.get(), targetValue) === 0) {
                return returnPath ? path : true;
            }

            const edges = this.getEdges(vertex);
            for (const edge of edges) {
                const edgeWeight: number = edge.weights ? edge.weights[0] : 0;
                const newDistance: number = distance + edgeWeight;
                if (!visited.has(edge.vertex) && (!distances.has(edge.vertex) || newDistance < distances.get(edge.vertex)!)) {
                    distances.set(edge.vertex, newDistance);
                    queue.push({ vertex: edge.vertex, path: [...path, edge.vertex], distance: newDistance });
                }
            }
        }

        return returnPath ? result : false;
    }

    /**
     * Traverses the graph starting from a given vertex using the specified traversal type.
     * @param {TraverseOptions<T>} options - Options for the traversal.
     * @returns {Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>} An array of vertices in the order they were visited.
     * @complexity DFS: O(V + E), BFS: O(V + E) - Where V is the number of vertices and E is the number of edges.
     */
    public traverse(options: TraverseOptions<T>): Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>> {
        const { startVertex, traversalType }: TraverseOptions<T> = options;
        if (traversalType === "DFS") {
            return this.depthFirstSearch({ startVertex }) as Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>;
        } else if (traversalType === "BFS") {
            return this.breadthFirstSearch({ startVertex }) as Array<WeightedGraphVertex<T> | UnweightedGraphVertex<T>>;
        } else {
            throw new Error("Invalid traversal type. Use 'DFS' or 'BFS'.");
        }
    }

    /**
     * Creates a random graph.
     * @param {CreateRandomGraphOptions} options - Options for creating the random graph.
     * @returns {Graph<number>} The created graph.
     * @remarks
     * The options object includes the following properties:
     * - vertexCount: The number of vertices in the graph.
     * - isWeighted: Indicates if the graph is weighted.
     * - isUndirected: Indicates if the graph is undirected.
     * - compare: The comparison function.
     * - minEdges: The minimum number of edges per vertex.
     * - maxEdges: The maximum number of edges per vertex.
     * - minWeight: The minimum weight of the edges (only for weighted graphs).
     * - maxWeight: The maximum weight of the edges (only for weighted graphs).
     *
     * @example
     * const graph = Graph.createRandomGraph({
     *     vertexCount: 6,
     *     isWeighted: false,
     *     isUndirected: false,
     *     compare: (a, b) => a - b,
     *     minEdges: 1,
     *     maxEdges: 3
     * });
     */
    public static createRandomGraph(options: CreateRandomGraphOptions): Graph<number> {
        const { vertexCount, minEdges = 1, maxEdges = 3, minWeight = 1, maxWeight = 10, ...graphOptions }: CreateRandomGraphOptions = options;
        const graph: Graph<number> = new Graph<number>(graphOptions);

        for (let i: number = 1; i <= vertexCount; i++) {
            graph.addVertex(i);
        }

        const vertices: (WeightedGraphVertex<number> | UnweightedGraphVertex<number>)[] = graph.getVertices();

        vertices.forEach((vertex: WeightedGraphVertex<number> | UnweightedGraphVertex<number>) => {
            const edgeCount: number = Math.floor(Math.random() * (maxEdges - minEdges + 1)) + minEdges;
            for (let i: number = 0; i < edgeCount; i++) {
                const targetVertex: WeightedGraphVertex<number> | UnweightedGraphVertex<number> = vertices[Math.floor(Math.random() * vertices.length)];
                if (vertex !== targetVertex) {
                    const weight: number = options.isWeighted
                        ? Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight
                        : 0;
                    graph.addEdge({ vertex1: vertex, vertex2: targetVertex, weight });
                }
            }
        });

        return graph;
    }
}

// Create a random graph with 6 vertices
const randomGraph = Graph.createRandomGraph({ vertexCount: 100, isWeighted: true, isUndirected: false, compare: (a, b) => a - b });

// Get all vertices
const allVertices = randomGraph.getVertices();

console.log("Graph structure:");
allVertices.forEach(vertex => {
    const edges = randomGraph.getEdges(vertex);
    console.log(`Vertex ${vertex.get()} connected to: ${edges.map(e => e.vertex.get()).join(', ')}`);
});

// Perform DFS traversal starting from the first vertex
const dfsTraversal = randomGraph.traverse({ startVertex: allVertices[0], traversalType: "DFS" });
console.log("DFS Traversal:", dfsTraversal.map(v => v.get()));

// Perform BFS traversal starting from the first vertex
const bfsTraversal = randomGraph.traverse({ startVertex: allVertices[0], traversalType: "BFS" });
console.log("BFS Traversal:", bfsTraversal.map(v => v.get()));
