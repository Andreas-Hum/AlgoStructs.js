import { WeightedGraphOptions } from "../../Options/AlgorithmOptions/GraphOptions/GraphOptions";

/**
 * Performs Dijkstra's algorithm on a graph to find the shortest path from a start node to all other nodes.
 * 
 * @template T - The type of the nodes in the graph.
 * @param {WeightedGraphOptions<T>} options - The options for the Dijkstra's algorithm.
 * @param {(node: T) => T[]} options.getNeighbors - The function to get the neighbors of a node.
 * @param {T} options.startNode - The starting node for the Dijkstra's algorithm.
 * @param {(node: T, neighbor: T) => number} options.getWeight - The function to get the weight of an edge between two nodes.
 * @param {(node: T) => void} [options.visit] - A callback function to process each visited node.
 * @param {T} [options.targetNode] - The target node for the Dijkstra's algorithm.
 * @returns {Map<T, number>} - A map of nodes to their shortest distance from the start node.
 * 
 * @remarks
 * The `getNeighbors` function should return an array of neighboring nodes for a given node.
 * The `getWeight` function should return the weight of the edge between two nodes.
 * The `visit` function is called for each node that is visited during the traversal.
 * 
 * @complexity
 * Time complexity: O((V + E) log V) - Where V is the number of vertices and E is the number of edges.
 * Space complexity: O(V) - We use a map to keep track of distances and a priority queue for the nodes.
 * 
 * @description
 * Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph. It starts at the start node and explores the graph by visiting nodes in order of their shortest known distance from the start node, updating the shortest known distance to each neighbor node.
 * 
 * The algorithm works as follows:
 * 1. Initialize the distance to the start node as 0 and all other nodes as infinity.
 * 2. Use a priority queue to store nodes to be visited.
 * 3. While the queue is not empty, pop the node with the smallest distance.
 * 4. For each neighbor of the node, calculate the new distance and update if it's smaller than the known distance.
 * 
 * @example
 * // Define a simple graph using an object
 * const graph: { [key: number]: { neighbor: number, weight: number }[] } = {
 *      1: [{ neighbor: 2, weight: 1 }, { neighbor: 3, weight: 4 }],
 *      2: [{ neighbor: 3, weight: 2 }, { neighbor: 4, weight: 7 }],
 *      3: [{ neighbor: 4, weight: 1 }],
 *      4: []
 * };
 * 
 * // Implement the getNeighbors function
 * const getNeighbors = (node: number): number[] => graph[node].map(edge => edge.neighbor);
 * 
 * // Implement the getWeight function
 * const getWeight = (node: number, neighbor: number): number => graph[node].find(edge => edge.neighbor === neighbor)!.weight;
 * 
 * // Define a visit function
 * const visit = (node: number): void => {
 *     console.log('Visited node:', node);
 * };
 * 
 * // Perform Dijkstra's algorithm
 * const distances = dijkstra({ getNeighbors, getWeight, startNode: 1, visit });
 * console.log('Shortest distances from start node:', distances);
 * 
 */
export function dijkstra<T>({ getNeighbors, getWeight, startNode, visit, targetNode }: WeightedGraphOptions<T>): Map<T, number> {
    const distances: Map<T, number> = new Map();
    const visited: Set<T> = new Set();
    const pq: [T, number][] = [];

    distances.set(startNode, 0);
    pq.push([startNode, 0]);

    while (pq.length > 0) {
        pq.sort((a, b) => a[1] - b[1]);
        const [currentNode, currentDistance]: [T, number] = pq.shift()!;

        if (visited.has(currentNode)) {
            continue;
        }

        visited.add(currentNode);
        if (visit) {
            visit(currentNode);
        }

        if (currentNode === targetNode) {
            break;
        }

        const neighbors: T[] = getNeighbors(currentNode);
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                const weight: number = getWeight(currentNode, neighbor);
                const distance: number = currentDistance + weight;

                if (distance < (distances.get(neighbor) || Infinity)) {
                    distances.set(neighbor, distance);
                    pq.push([neighbor, distance]);
                }
            }
        }
    }

    return distances;
}
