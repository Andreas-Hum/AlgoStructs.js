// AStar.ts
import { WeightedGraphOptions } from "../../Options/AlgorithmOptions/GraphOptions/GraphOptions";

/**
 * Performs the A* algorithm on a graph to find the shortest path from a start node to the target node.
 * 
 * @template T - The type of the nodes in the graph.
 * @param {WeightedGraphOptions<T>} options - The options for the A* algorithm.
 * @param {(node: T) => T[]} options.getNeighbors - The function to get the neighbors of a node.
 * @param {T} options.startNode - The starting node for the A* algorithm.
 * @param {T} options.targetNode - The target node for the A* algorithm.
 * @param {(node: T, neighbor: T) => number} options.getWeight - The function to get the weight of an edge between two nodes.
 * @param {(node: T) => number} options.heuristic - The heuristic function to estimate the distance from a node to the target.
 * @param {(node: T) => void} [options.visit] - A callback function to process each visited node.
 * @returns {T[]} - An array representing the shortest path from the start node to the target node.
 * 
 * @remarks
 * The `getNeighbors` function should return an array of neighboring nodes for a given node.
 * The `getWeight` function should return the weight of the edge between two nodes.
 * The `heuristic` function should return an estimate of the distance from a node to the target node.
 * The `visit` function is called for each node that is visited during the traversal.
 * 
 * @complexity
 * Time complexity: O((V + E) log V) - Where V is the number of vertices and E is the number of edges.
 * Space complexity: O(V) - We use a map to keep track of distances and a priority queue for the nodes.
 * 
 * @description
 * The A* algorithm is an algorithm for finding the shortest path between nodes in a graph. It combines features of Dijkstra's algorithm and a heuristic function to guide the search towards the target node.
 * 
 * The algorithm works as follows:
 * 1. Initialize the distance to the start node as 0 and all other nodes as infinity.
 * 2. Use a priority queue to store nodes to be visited, prioritized by their estimated total cost.
 * 3. While the queue is not empty, pop the node with the smallest estimated total cost.
 * 4. For each neighbor of the node, calculate the new distance and update if it's smaller than the known distance.
 * 5. Use the heuristic function to estimate the total cost from each neighbor to the target node.
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
 * // Implement the heuristic function (for example, the Euclidean distance)
 * const heuristic = (node: number, target: number): number => Math.abs(node - target);
 * 
 * // Define a visit function
 * const visit = (node: number): void => {
 *     console.log('Visited node:', node);
 * };
 * 
 * // Perform A* algorithm
 * const path = aStar({ getNeighbors, getWeight, heuristic, startNode: 1, targetNode: 4, visit });
 * console.log('Shortest path from start node to target node:', path);
 * 
 */
export function aStar<T>({ getNeighbors, getWeight, heuristic, startNode, targetNode, visit }: WeightedGraphOptions<T>): T[] {
    const openSet = new Set<T>([startNode]);
    const cameFrom = new Map<T, T>();

    const gScore = new Map<T, number>();
    const fScore = new Map<T, number>();
    gScore.set(startNode, 0);
    fScore.set(startNode, heuristic ? heuristic(startNode, targetNode!) : 0);

    const pq: [T, number][] = [[startNode, fScore.get(startNode)!]];

    while (openSet.size > 0) {
        pq.sort((a, b) => a[1] - b[1]);
        const [current]: [T, number] = pq.shift()!;
        openSet.delete(current);

        if (visit) {
            visit(current);
        }

        if (current === targetNode) {
            const path: T[] = [];
            let temp: T | undefined = current;
            while (temp) {
                path.push(temp);
                temp = cameFrom.get(temp);
            }
            return path.reverse();
        }

        const neighbors: T[] = getNeighbors(current);
        for (const neighbor of neighbors) {
            const tentativeGScore = gScore.get(current)! + getWeight(current, neighbor);

            if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + (heuristic ? heuristic(neighbor, targetNode!) : 0));

                if (!openSet.has(neighbor)) {
                    openSet.add(neighbor);
                    pq.push([neighbor, fScore.get(neighbor)!]);
                }
            }
        }
    }

    return [];
}
