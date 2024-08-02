import GraphOptions from "../../Options/AlgorithmOptions/GraphOptions/GraphOptions"

/**
 * Performs a depth-first search (DFS) on a graph.
 * 
 * @template T - The type of the nodes in the graph.
 * @param {GraphOtions<T>} options - The options for the DFS traversal.
 * @param {(node: T) => T[]} options.getNeighbors - The function to get the neighbors of a node.
 * @param {T} options.startNode - The starting node for the DFS traversal.
 * @param {(node: T) => void} [options.visit] - A callback function to process each visited node.
 * @param {T} [options.targetNode] - The target node for the DFS traversal.
 * @returns {T[]} - An array of visited nodes in order.
 * 
 * @remarks
 * The `getNeighbors` function should return an array of neighboring nodes for a given node.
 * The `visit` function is called for each node that is visited during the traversal.
 * 
 * @complexity
 * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
 * Space complexity: O(V) - We use a set to keep track of visited nodes and the call stack for recursion.
 * 
 * @description
 * Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or an arbitrary node of a graph, sometimes referred to as a 'search key') and explores as far as possible along each branch before backtracking.
 * 
 * The algorithm works as follows:
 * 1. Define a recursive helper function to perform the DFS.
 * 2. Initialize a set to keep track of visited nodes.
 * 3. Call the recursive helper function with the starting node.
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
 * // Perform DFS
 * const visitedNodes = DepthFirstSearch({ getNeighbors, startNode: 1, visit });
 * console.log('Visited nodes in order:', visitedNodes);
 * 
 */
export  function DepthFirstSearch<T>({ getNeighbors, startNode, visit, targetNode }: GraphOptions<T>): T[] {
    const visited: Set<T> = new Set();
    const visitedNodes: T[] = [];

    function dfs(node: T): boolean {
        if (visited.has(node)) {
            return false;
        }

        if (visit) {
            visit(node);
        }
        visited.add(node);
        visitedNodes.push(node);

        if (node === targetNode) {
            return true;
        }

        const neighbors: T[] = getNeighbors(node);
        for (const neighbor of neighbors) {
            if (dfs(neighbor)) {
                return true;
            }
        }

        return false;
    }

    dfs(startNode);
    return visitedNodes;
}