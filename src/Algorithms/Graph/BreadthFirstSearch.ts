import GraphOptions from "../../Options/AlgorithmOptions/GraphOptions/GraphOptions"

/**
 * Performs a breadth-first search (BFS) on a graph.
 * 
 * @template T - The type of the nodes in the graph.
 * @param {GraphOptions<T>} options - The options for the BFS traversal.
 * @param {(node: T) => T[]} options.getNeighbors - The function to get the neighbors of a node.
 * @param {T} options.startNode - The starting node for the BFS traversal.
 * @param {(node: T) => void} [options.visit] - A callback function to process each visited node.
 * @param {T} [options.targetNode] - The target node for the BFS traversal.
 * @returns {T[]} - An array of visited nodes in order.
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
 *       ii. Call the `visit` function with the node (if provided).
 *       iii. Enqueue all unvisited neighbors of the node.
 * 
 * @remark
 * The comparison function should return:
 * - A negative number if the first argument is less than the second.
 * - Zero if the first argument is equal to the second.
 * - A positive number if the first argument is greater than the second.
 * 
 * @example
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
 * const visitedNodes = breadthFirstSearch({ getNeighbors, startNode: 1, visit });
 * console.log('Visited nodes in order:', visitedNodes);
 * 
 */
export  function breadthFirstSearch<T>({ getNeighbors, startNode, visit, targetNode }: GraphOptions<T>): T[] {
    const queue: T[] = [startNode];
    const visited: Set<T> = new Set();
    const visitedNodes: T[] = [];

    while (queue.length > 0) {
        const currentNode: T = queue.shift() as T;

        if (!visited.has(currentNode)) {
            if (visit) {
                visit(currentNode);
            }
            visited.add(currentNode);
            visitedNodes.push(currentNode);

            if (currentNode === targetNode) {
                return visitedNodes;
            }

            const neighbors: T[] = getNeighbors(currentNode);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return visitedNodes;
}