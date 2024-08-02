
import WeightedGraphVertex from "../Vertices/WeightedGraphVertex";

import {
    GraphOptions,
    EdgeOptions,
    SearchOptions,
    TraverseOptions,
    CreateRandomGraphOptions,
} from '../Options/VertexGraphOptions/WeightedOptions';


export default class Graph<T> {

    private _vertices: Set<WeightedGraphVertex<T>>;
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
     * @returns {WeightedGraphVertex<T>} The created vertex.
     * @complexity
     * Time complexity: O(1) - Constant time operation
     * Space complexity: O(1) - Constant space operation
     */
    public addVertex(val: T): WeightedGraphVertex<T> {
        const vertex: WeightedGraphVertex<T> = new WeightedGraphVertex(val);
        this._vertices.add(vertex);
        return vertex;
    }

    /**
     * Removes a vertex from the graph.
     * @param {WeightedGraphVertex<T>} vertex - The vertex to remove.
     * @returns {boolean} True if the vertex was removed, otherwise false.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(1) - Constant space operation
     */
    public removeVertex(vertex: WeightedGraphVertex<T>): boolean {
        if (!this._vertices.has(vertex)) {
            return false;
        }
        this._vertices.delete(vertex);
        vertex.getEdges().forEach((edge: { vertex: WeightedGraphVertex<T>, weights: number[] }) => {
            edge.vertex.removeEdge({ vertex, weight: 0, undirected: this._isUndirected });
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
        return vertex1.addEdge({ vertex: vertex2, weight, undirected: this._isUndirected });
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
        return vertex1.removeEdge({ vertex: vertex2, weight, undirected: this._isUndirected });
    }

    /**
     * Gets all vertices in the graph.
     * @returns {Array<WeightedGraphVertex<T>>} An array of all vertices in the graph.
     * @complexity
     * Time complexity: O(V) - Where V is the number of vertices.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public getVertices(): Array<WeightedGraphVertex<T>> {
        return Array.from(this._vertices);
    }

    /**
     * Gets all edges of a vertex in the graph.
     * @param {WeightedGraphVertex<T>} vertex - The vertex to get edges for.
     * @returns {Array<{ vertex: WeightedGraphVertex<T>, weights?: number[] }>} An array of edges.
     * @complexity
     * Time complexity: O(E) - Where E is the number of edges.
     * Space complexity: O(E) - Where E is the number of edges;
     */
    public getEdges(vertex: WeightedGraphVertex<T>): Array<{ vertex: WeightedGraphVertex<T>, weights?: number[] }> {
        return vertex.getEdges().map(edge => ({ vertex: edge.vertex, weights: edge.weights }));
    }

    /**
     * Performs a depth-first search (DFS) starting from a given vertex.
     * @param {SearchOptions<T>} options - Options for the DFS.
     * @returns {Array<WeightedGraphVertex<T>> | boolean} An array of vertices in the order they were visited if returnPath is true, or a boolean indicating if the target is found.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public depthFirstSearch(options: SearchOptions<T>): Array<WeightedGraphVertex<T>> | boolean {
        const { startVertex, targetValue = null, returnPath = true } = options;
        const visited: Set<WeightedGraphVertex<T>> = new Set();
        const result: Array<WeightedGraphVertex<T>> = [];
        const found = { value: false };

        this._dfs(startVertex, targetValue, visited, result, found);
        return returnPath ? result : found.value;
    }

    private _dfs(
        vertex: WeightedGraphVertex<T>,
        targetValue: T | null,
        visited: Set<WeightedGraphVertex<T>>,
        result: Array<WeightedGraphVertex<T>>,
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
     * @returns {Array<WeightedGraphVertex<T>> | boolean} An array of vertices in the order they were visited if returnPath is true, or a boolean indicating if the target is found.
     * @complexity
     * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public breadthFirstSearch(options: SearchOptions<T>): Array<WeightedGraphVertex<T>> | boolean {
        const { startVertex, targetValue = null, returnPath = true } = options;
        return this._weightedBFS(startVertex, targetValue, returnPath);
    }

    private _weightedBFS(startVertex: WeightedGraphVertex<T>, targetValue: T | null, returnPath: boolean): Array<WeightedGraphVertex<T>> | boolean {
        const visited: Set<WeightedGraphVertex<T>> = new Set();
        const distances: Map<WeightedGraphVertex<T>, number> = new Map();
        const queue: Array<{ vertex: WeightedGraphVertex<T>, path: Array<WeightedGraphVertex<T>>, distance: number }> = [{ vertex: startVertex, path: [startVertex], distance: 0 }];
        const result: Array<WeightedGraphVertex<T>> = [];

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
     * @returns {Array<WeightedGraphVertex<T>>} An array of vertices in the order they were visited.
     * @complexity DFS: O(V + E), BFS: O(V + E) - Where V is the number of vertices and E is the number of edges.
     */
    public traverse(options: TraverseOptions<T>): Array<WeightedGraphVertex<T>> {
        const { startVertex, traversalType } = options;
        if (traversalType === "DFS") {
            return this.depthFirstSearch({ startVertex }) as Array<WeightedGraphVertex<T>>;
        } else if (traversalType === "BFS") {
            return this.breadthFirstSearch({ startVertex }) as Array<WeightedGraphVertex<T>>;
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
     * - minWeight: The minimum weight of the edges.
     * - maxWeight: The maximum weight of the edges.
     *
     * @example
     * const graph = Graph.createRandomGraph({
     *     vertexCount: 6,
     *     isUndirected: false,
     *     compare: (a, b) => a - b,
     *     minEdges: 1,
     *     maxEdges: 3,
     *     minWeight: 1,
     *     maxWeight: 10
     * });
     */
    public static createRandomGraph(options: CreateRandomGraphOptions): Graph<number> {
        const { vertexCount, minEdges = 1, maxEdges = 3, minWeight = 1, maxWeight = 10, ...graphOptions } = options;
        const graph: Graph<number> = new Graph<number>(graphOptions);

        for (let i: number = 1; i <= vertexCount; i++) {
            graph.addVertex(i);
        }

        const vertices: WeightedGraphVertex<number>[] = graph.getVertices();

        vertices.forEach((vertex: WeightedGraphVertex<number>) => {
            const edgeCount: number = Math.floor(Math.random() * (maxEdges - minEdges + 1)) + minEdges;
            for (let i: number = 0; i < edgeCount; i++) {
                const targetVertex: WeightedGraphVertex<number> = vertices[Math.floor(Math.random() * vertices.length)];
                if (vertex !== targetVertex) {
                    const weight: number = Math.floor(Math.random() * (maxWeight - minWeight + 1)) + minWeight;
                    graph.addEdge({ vertex1: vertex, vertex2: targetVertex, weight });
                }
            }
        });

        return graph;
    }

    /**
     * Implements Dijkstra's algorithm to find the shortest path from a start vertex to a target vertex.
     * @param {WeightedGraphVertex<T>} startVertex - The starting vertex.
     * @param {WeightedGraphVertex<T>} targetVertex - The target vertex.
     * @returns {Array<WeightedGraphVertex<T>>} The shortest path to the target vertex.
     * @complexity 
     * Time complexity: O((V + E) log V) - Where V is the number of vertices and E is the number of edges.
     * Space complexity: O(V) - Where V is the number of vertices.
     */
    public dijkstra(startVertex: WeightedGraphVertex<T>, targetVertex: WeightedGraphVertex<T>): Array<WeightedGraphVertex<T>> {
        const distances: Map<WeightedGraphVertex<T>, number> = new Map();
        const previous: Map<WeightedGraphVertex<T>, WeightedGraphVertex<T> | null> = new Map();
        const pq: Array<{ vertex: WeightedGraphVertex<T>, distance: number }> = [];

        this._vertices.forEach(vertex => {
            distances.set(vertex, Infinity);
            previous.set(vertex, null);
        });

        distances.set(startVertex, 0);
        pq.push({ vertex: startVertex, distance: 0 });

        while (pq.length > 0) {
            pq.sort((a, b) => a.distance - b.distance);
            const { vertex: currentVertex, distance: currentDistance }: { vertex: WeightedGraphVertex<T>, distance: number } = pq.shift()!;

            if (currentVertex === targetVertex) {
                const path: Array<WeightedGraphVertex<T>> = [];
                let step: WeightedGraphVertex<T> | null = targetVertex;
                while (step) {
                    path.unshift(step);
                    step = previous.get(step) || null;
                }
                return path;
            }

            const edges: {
                vertex: WeightedGraphVertex<T>;
                weights?: number[];
            }[] = this.getEdges(currentVertex);
            for (const edge of edges) {
                const edgeWeight: number = edge.weights ? Math.min(...edge.weights) : 0;
                const newDistance: number = currentDistance + edgeWeight;

                if (newDistance < distances.get(edge.vertex)!) {
                    distances.set(edge.vertex, newDistance);
                    previous.set(edge.vertex, currentVertex);
                    pq.push({ vertex: edge.vertex, distance: newDistance });
                }
            }
        }

        return [];
    }

}

// Create a comparison function for numbers
const compareNumbers = (a: number, b: number) => a - b;

// Create a weighted graph
const graph = new Graph<number>({
    isUndirected: false,
    compare: compareNumbers
});

// Add vertices
const vertexA = graph.addVertex(1);
const vertexB = graph.addVertex(2);
const vertexC = graph.addVertex(3);
const vertexD = graph.addVertex(4);
const vertexE = graph.addVertex(5);

// Add edges with weights
graph.addEdge({ vertex1: vertexA, vertex2: vertexB, weight: 4 });
graph.addEdge({ vertex1: vertexA, vertex2: vertexC, weight: 2 });
graph.addEdge({ vertex1: vertexB, vertex2: vertexD, weight: 3 });
graph.addEdge({ vertex1: vertexC, vertex2: vertexB, weight: 1 });
graph.addEdge({ vertex1: vertexC, vertex2: vertexD, weight: 5 });
graph.addEdge({ vertex1: vertexD, vertex2: vertexE, weight: 2 });

const distancesOrPath = graph.dijkstra(vertexA, vertexE);

if (distancesOrPath instanceof Map) {
    console.log("Shortest distances from vertex A to all other vertices:");
    distancesOrPath.forEach((distance, vertex) => {
        console.log(`Vertex: ${vertex}, Distance: ${distance}`);
    });
} else if (Array.isArray(distancesOrPath)) {
    console.log("Shortest path from vertex A to target vertex:");
    distancesOrPath.forEach(vertex => {
        console.log(`Vertex: ${vertex}`);
    });
} else {
    console.error("Unexpected return type from dijkstra method");
}