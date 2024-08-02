import { TopologicalSortOptions } from "../../Options/AlgorithmOptions/GraphOptions/GraphOptions";

/**
 * Performs topological sorting on a directed acyclic graph (DAG).
 * 
 * @template T - The type of the nodes in the graph.
 * @param {TopologicalSortOptions<T>} options - The options for the topological sorting.
 * @param {(node: T) => T[]} options.getNeighbors - The function to get the neighbors of a node.
 * @param {T[]} options.nodes - The list of all nodes in the graph.
 * @returns {T[]} - An array representing the nodes in topologically sorted order.
 * 
 * @throws Will throw an error if the graph is not a DAG.
 * 
 * @remarks
 * The `getNeighbors` function should return an array of neighboring nodes for a given node.
 * 
 * @complexity
 * Time complexity: O(V + E) - Where V is the number of vertices and E is the number of edges.
 * Space complexity: O(V) - We use additional space for the visited set, temporary marks set, and the stack.
 * 
 * @description
 * Topological sorting of a directed acyclic graph (DAG) is a linear ordering of its vertices such that for every directed edge UV from vertex U to vertex V, U comes before V in the ordering.
 * 
 * The algorithm works as follows:
 * 1. Mark all nodes as unvisited.
 * 2. For each unvisited node, perform a depth-first search (DFS) and mark nodes as temporarily visited.
 * 3. If a node is encountered that is already temporarily visited, the graph is not a DAG.
 * 4. Once all neighbors of a node are visited, mark the node as permanently visited and add it to the stack.
 * 5. Reverse the stack to get the topological order.
 * 
 * @example
 * // Define a simple graph using an object
 * const graph: { [key: number]: number[] } = {
 *      1: [2, 3],
 *      2: [4],
 *      3: [4],
 *      4: []
 * };
 * 
 * // Implement the getNeighbors function
 * const getNeighbors = (node: number): number[] => graph[node];
 * 
 * // Perform topological sort
 * const sortedNodes = topologicalSort({ getNeighbors, nodes: [1, 2, 3, 4] });
 * console.log('Topologically sorted nodes:', sortedNodes);
 * 
 */
export function topologicalSort<T>({ getNeighbors, nodes }: TopologicalSortOptions<T>): T[] {
    const visited: Set<T> = new Set();
    const stack: T[] = [];
    const tempMarks: Set<T> = new Set();

    /**
     * Visits a node and its neighbors recursively.
     * 
     * @param {T} node - The node to visit.
     * @throws Will throw an error if a cycle is detected (i.e., the graph is not a DAG).
     */
    function visit(node: T) {
        if (tempMarks.has(node)) {
            throw new Error("The graph is not a DAG");
        }

        if (!visited.has(node)) {
            tempMarks.add(node);
            getNeighbors(node).forEach(visit);
            tempMarks.delete(node);
            visited.add(node);
            stack.push(node);
        }
    }

    nodes.forEach(node => {
        if (!visited.has(node)) {
            visit(node);
        }
    });

    return stack.reverse();
}