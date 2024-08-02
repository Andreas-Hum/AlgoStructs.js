// TopologicalSort.test.ts
import { topologicalSort } from '../../../src/Algorithms/Graph';
import { TopologicalSortOptions } from '../../../src/Options/AlgorithmOptions/GraphOptions/GraphOptions';
import * as fc from 'fast-check';

describe('topologicalSort', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    const getNeighbors = (graph: { [key: number]: number[] }) => (node: number): number[] => graph[node] || [];

    const isTopologicallySorted = (graph: { [key: number]: number[] }, sorted: number[]): boolean => {
        const position: Map<number, number> = new Map();
        sorted.forEach((node: number, index: number) => position.set(node, index));

        for (const [node, neighbors] of Object.entries(graph)) {
            for (const neighbor of neighbors) {
                if (position.get(Number(node))! >= position.get(neighbor)!) {
                    return false;
                }
            }
        }
        return true;
    };

    const generateDAG = (): fc.Arbitrary<{ [key: string]: number[] }> => {
        return fc.dictionary(
            fc.integer({ min: 1, max: 20 }).map(String),
            fc.array(fc.integer({ min: 1, max: 20 }), { minLength: 0, maxLength: 5 })
        ).filter((graph: { [key: string]: number[] }) => {
            const nodes: number[] = Object.keys(graph).map(Number);
            const edges: [number, number][] = nodes.flatMap(node => graph[node.toString()].map((neighbor: number): [number, number] => [node, neighbor]));

            if (edges.some(([from, to]: [number, number]) => from === to)) {
                return false;
            }

            const visited: Set<number> = new Set();
            const tempMarks: Set<number> = new Set();

            const visit = (node: number): boolean => {
                if (tempMarks.has(node)) return false;
                if (visited.has(node)) return true;

                tempMarks.add(node);
                const neighbors: number[] = graph[node.toString()] || [];
                for (const neighbor of neighbors) {
                    if (!visit(neighbor)) return false;
                }
                tempMarks.delete(node);
                visited.add(node);
                return true;
            };

            return nodes.every((node: number) => visit(node));
        });
    };

    test('should sort nodes in topological order', () => {
        fc.assert(
            fc.property(
                generateDAG(),
                (graph: { [key: string]: number[] }) => {
                    const intGraph: { [key: number]: number[] } = Object.fromEntries(Object.entries(graph).map(([key, value]) => [parseInt(key), value]));
                    const nodes: number[] = Object.keys(intGraph).map(Number);
                    const sortedNodes: number[] = topologicalSort({ getNeighbors: getNeighbors(intGraph), nodes });
                    expect(isTopologicallySorted(intGraph, sortedNodes)).toBe(true);
                }
            )
        );
    });

    test('should throw an error if the graph is not a DAG', () => {
        const cyclicGraph: { [key: number]: number[] } = {
            1: [2],
            2: [3],
            3: [1]
        };
        expect(() => topologicalSort({ getNeighbors: getNeighbors(cyclicGraph), nodes: [1, 2, 3] })).toThrow("The graph is not a DAG");
    });
});
