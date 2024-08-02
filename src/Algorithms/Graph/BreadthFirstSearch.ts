/**
 * Options for the BFS function.
 */
interface BFSOptions<T> {
    /**
     * The function to get the neighbors of a node.
     * @param node - The node whose neighbors are to be retrieved.
     * @returns An array of neighboring nodes.
     */
    getNeighbors: (node: T) => T[];

    /**
     * The starting node for the BFS traversal.
     */
    startNode: T;

    /**
     * A callback function to process each visited node.
     * @param node - The node that has been visited.
     */
    visit: (node: T) => void;
}

/**
 * Performs a breadth-first search (BFS) on a graph.
 * 
 * @template T - The type of the nodes in the graph.
 * @param {BFSOptions<T>} options - The options for the BFS traversal.
 * @param {(node: T) => T[]} options.getNeighbors - The function to get the neighbors of a node.
 * @param {T} options.startNode - The starting node for the BFS traversal.
 * @param {(node: T) => void} options.visit - A callback function to process each visited node.
 * 
 * @remarks
 * The `getNeighbors` function should return an array of neighboring nodes for a given node.
 * The `visit` function is called for each node that is visited during the traversal.
 * 
 * @complexity
 * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
 * Space complexity: O(V) - We use a queue and a set to keep track of visited nodes.
 * 
 * @description
 * Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or an arbitrary node of a graph, sometimes referred to as a 'search key') and explores the neighbor nodes at the present depth prior to moving on to nodes at the next depth level.
 * 
 * The algorithm works as follows:
 * 1. Initialize a queue with the starting node.
 * 2. Initialize a set to keep track of visited nodes.
 * 3. While the queue is not empty, do the following:
 *    a. Dequeue a node from the front of the queue.
 *    b. If the node has not been visited, do the following:
 *       i. Mark the node as visited.
 *       ii. Call the `visit` function with the node.
 *       iii. Enqueue all unvisited neighbors of the node.
 * 
 * @example
 * // Import the bfs function
 * import bfs from './BreadthFirstSearch';
 * 
 * // Define a simple graph using an object
 * const graph: { [key: number]: number[] } = {
 *      1: [2, 3],
 *      2: [4],
 *      3: [4, 5],
 *      4: [],
 *      5: []
 * };
 * 
 * // Implement the getNeighbors function
 * const getNeighbors = (node: number): number[] => graph[node] || [];
 * 
 * // Define a visit function
 * const visit = (node: number): void => {
 *     console.log('Visited node:', node);
 * };
 * 
 * // Perform BFS
 * bfs({ getNeighbors, startNode: 1, visit });
 * 
 */
export default function BFS<T>({ getNeighbors, startNode, visit }: BFSOptions<T>): void {
    const queue: T[] = [startNode];
    const visited: Set<T> = new Set();

    while (queue.length > 0) {
        const currentNode: T = queue.shift() as T;

        if (!visited.has(currentNode)) {
            visit(currentNode);
            visited.add(currentNode);

            const neighbors: T[] = getNeighbors(currentNode);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }
}