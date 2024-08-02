import UnweightedGraphVertex from "../Vertices/UnweightedGraphVertex";

// General graph options
export type GraphOptions<T> = {
    isUndirected?: boolean;
    compare: (a: T, b: T) => number;
};

// Edge options for unweighted graphs
export type EdgeOptions<T> = {
    vertex1: UnweightedGraphVertex<T>;
    vertex2: UnweightedGraphVertex<T>;
};

// Search options for graph traversal
export type SearchOptions<T> = {
    startVertex: UnweightedGraphVertex<T>;
    targetValue?: T | null;
    returnPath?: boolean;
}

// Options for graph traversal
export type TraverseOptions<T> = {
    startVertex: UnweightedGraphVertex<T>;
    traversalType: "DFS" | "BFS";
};

// Options for creating a random graph
export type CreateRandomGraphOptions = GraphOptions<number> & {
    vertexCount: number;
    minEdges?: number;
    maxEdges?: number;
};

// Options for adding edges to unweighted graphs
export type UnweightedAddEdgeOptions<T> = {
    vertex: UnweightedGraphVertex<T>;
    undirected?: boolean;
};

// Options for removing edges from unweighted graphs
export type UnweightedRemoveEdgeOptions<T> = {
    vertex: UnweightedGraphVertex<T>;
    undirected?: boolean;
};

// Options for setting edges in unweighted graphs
export type UnweightedSetEdgesOptions<T> = {
    edges: Array<UnweightedGraphVertex<T>>;
    undirected?: boolean;
};

// Options for setting a single edge in unweighted graphs
export type UnweightedSetEdgeOptions<T> = {
    oldVertex: UnweightedGraphVertex<T>;
    newVertex: UnweightedGraphVertex<T>;
    undirected?: boolean;
};

export default class Graph<T> {

    private _vertices: Set<UnweightedGraphVertex<T>>;
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
     * const graph: Graph<number> = new Graph<number>({ isUndirected: false, compare: compareNumbers });
     */
    constructor(options: GraphOptions<T>) {
        this._vertices = new Set();
        this._isUndirected = options.isUndirected ?? false;
        this._compare = options.compare;
    }

    /**
     * Adds a vertex to the graph.
     * @param {T} val - The value of the vertex.
     * @returns {UnweightedGraphVertex<T>} The created vertex.
     * @complexity
     * Time complexity: O(1) - Constant time operation
     * Space complexity: O(1) - Constant space operation
     */
    public addVertex(val: T): UnweightedGraphVertex<T> {
        const vertex = new UnweightedGraphVertex(val);
        this._vertices.add(vertex);
        return vertex;
    }

    /**
     * Removes a vertex from the graph.
     * @param {UnweightedGraphVertex<T>} vertex - The vertex to remove.
     * @returns {boolean} True if the vertex was removed, otherwise false.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(1) - Constant space operation
     */
    public removeVertex(vertex: UnweightedGraphVertex<T>): boolean {
        if (!this._vertices.has(vertex)) {
            return false;
        }
        this._vertices.delete(vertex);
        vertex.getEdges().forEach((edge: UnweightedGraphVertex<T>) => {
            edge.removeEdge({ vertex: vertex, undirected: this._isUndirected });
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
        const { vertex1, vertex2 } = options;
        return vertex1.addEdge({ vertex: vertex2, undirected: this._isUndirected });
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
        const { vertex1, vertex2 } = options;
        return vertex1.removeEdge({ vertex: vertex2, undirected: this._isUndirected });
    }

    /**
     * Gets all vertices in the graph.
     * @returns {Array<UnweightedGraphVertex<T>>} An array of all vertices in the graph.
     * @complexity
     * Time complexity: O(V) - Where V is the number of vertices.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public getVertices(): Array<UnweightedGraphVertex<T>> {
        return Array.from(this._vertices);
    }

    /**
     * Gets all edges of a vertex in the graph.
     * @param {UnweightedGraphVertex<T>} vertex - The vertex to get edges for.
     * @returns {Array<{ vertex: UnweightedGraphVertex<T> }>} An array of edges.
     * @complexity
     * Time complexity: O(E) - Where E is the number of edges.
     * Space complexity: O(E) - Where E is the number of edges;
     */
    public getEdges(vertex: UnweightedGraphVertex<T>): Array<{ vertex: UnweightedGraphVertex<T> }> {
        return vertex.getEdges().map(edge => ({ vertex: edge }));
    }

    /**
     * Performs a depth-first search (DFS) starting from a given vertex.
     * @param {SearchOptions<T>} options - Options for the DFS.
     * @returns {Array<UnweightedGraphVertex<T>> | boolean} An array of vertices in the order they were visited if returnPath is true, or a boolean indicating if the target is found.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public depthFirstSearch(options: SearchOptions<T>): Array<UnweightedGraphVertex<T>> | boolean {
        const { startVertex, targetValue = null, returnPath = true } = options;
        const visited: Set<UnweightedGraphVertex<T>> = new Set();
        const result: Array<UnweightedGraphVertex<T>> = [];
        const found = { value: false };

        this._dfs(startVertex, targetValue, visited, result, found);
        return returnPath ? result : found.value;
    }

    private _dfs(
        vertex: UnweightedGraphVertex<T>,
        targetValue: T | null,
        visited: Set<UnweightedGraphVertex<T>>,
        result: Array<UnweightedGraphVertex<T>>,
        found: { value: boolean }
    ): void {
        if (visited.has(vertex) || found.value) return;
        visited.add(vertex);
        result.push(vertex);

        if (targetValue !== null && this._compare(vertex.get(), targetValue) === 0) {
            found.value = true;
            return;
        }

        const edges = this.getEdges(vertex);
        for (const edge of edges) {
            this._dfs(edge.vertex, targetValue, visited, result, found);
            if (found.value) return;
        }
    }

    /**
     * Performs a breadth-first search (BFS) starting from a given vertex.
     * @param {SearchOptions<T>} options - Options for the BFS.
     * @returns {Array<UnweightedGraphVertex<T>> | boolean} An array of vertices in the order they were visited if returnPath is true, or a boolean indicating if the target is found.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public breadthFirstSearch(options: SearchOptions<T>): Array<UnweightedGraphVertex<T>> | boolean {
        const { startVertex, targetValue = null, returnPath = true } = options;
        return this._unweightedBFS(startVertex, targetValue, returnPath);
    }

    private _unweightedBFS(startVertex: UnweightedGraphVertex<T>, targetValue: T | null, returnPath: boolean): Array<UnweightedGraphVertex<T>> | boolean {
        const visited: Set<UnweightedGraphVertex<T>> = new Set();
        const queue: Array<{ vertex: UnweightedGraphVertex<T>, path: Array<UnweightedGraphVertex<T>> }> = [{ vertex: startVertex, path: [startVertex] }];
        const result: Array<UnweightedGraphVertex<T>> = [];

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

    /**
     * Traverses the graph starting from a given vertex using the specified traversal type.
     * @param {TraverseOptions<T>} options - Options for the traversal.
     * @returns {Array<UnweightedGraphVertex<T>>} An array of vertices in the order they were visited.
     * @complexity DFS: O(V + E), BFS: O(V + E) - Where V is the number of vertices and E is the number of edges.
     */
    public traverse(options: TraverseOptions<T>): Array<UnweightedGraphVertex<T>> {
        const { startVertex, traversalType } = options;
        if (traversalType === "DFS") {
            return this.depthFirstSearch({ startVertex }) as Array<UnweightedGraphVertex<T>>;
        } else if (traversalType === "BFS") {
            return this.breadthFirstSearch({ startVertex }) as Array<UnweightedGraphVertex<T>>;
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
     * - isUndirected: Indicates if the graph is undirected.
     * - compare: The comparison function.
     * - minEdges: The minimum number of edges per vertex.
     * - maxEdges: The maximum number of edges per vertex.
     *
     * @example
     * const graph = Graph.createRandomGraph({
     *     vertexCount: 6,
     *     isUndirected: false,
     *     compare: (a, b) => a - b,
     *     minEdges: 1,
     *     maxEdges: 3
     * });
     */
    public static createRandomGraph(options: CreateRandomGraphOptions): Graph<number> {
        const { vertexCount, minEdges = 1, maxEdges = 3, ...graphOptions } = options;
        const graph = new Graph<number>(graphOptions);

        for (let i = 1; i <= vertexCount; i++) {
            graph.addVertex(i);
        }

        const vertices = graph.getVertices();

        vertices.forEach((vertex) => {
            const edgeCount = Math.floor(Math.random() * (maxEdges - minEdges + 1)) + minEdges;
            for (let i = 0; i < edgeCount; i++) {
                const targetVertex = vertices[Math.floor(Math.random() * vertices.length)];
                if (vertex !== targetVertex) {
                    graph.addEdge({ vertex1: vertex, vertex2: targetVertex });
                }
            }
        });

        return graph;
    }
}
