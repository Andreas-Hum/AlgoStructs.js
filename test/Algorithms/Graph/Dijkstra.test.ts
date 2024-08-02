// Dijkstra.test.ts
import { dijkstra } from '../../../src/Algorithms/Graph';
import { WeightedGraphOptions } from '../../../src/Options/AlgorithmOptions/GraphOptions/GraphOptions';
import * as fc from 'fast-check';

describe('dijkstra', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    const getNeighbors = (graph: { [key: number]: { neighbor: number, weight: number }[] }) => (node: number): number[] => (graph[node] || []).map(edge => edge.neighbor);

    const getWeight = (graph: { [key: number]: { neighbor: number, weight: number }[] }) => (node: number, neighbor: number): number => {
        const edges = graph[node] || [];
        return Math.min(...edges.filter(edge => edge.neighbor === neighbor).map(edge => edge.weight));
    };

    const dijkstraManual = (graph: { [key: number]: { neighbor: number, weight: number }[] }, startNode: number): Map<number, number> => {
        const distances: Map<number, number> = new Map();
        const visited: Set<number> = new Set();
        const pq: [number, number][] = [];

        distances.set(startNode, 0);
        pq.push([startNode, 0]);

        while (pq.length > 0) {
            pq.sort((a, b) => a[1] - b[1]);
            const [currentNode, currentDistance]: [number, number] = pq.shift()!;

            if (visited.has(currentNode)) {
                continue;
            }

            visited.add(currentNode);

            const neighbors: {
                neighbor: number;
                weight: number;
            }[] = graph[currentNode] || [];
            for (const { neighbor, weight } of neighbors) {
                if (!visited.has(neighbor)) {
                    const distance: number = currentDistance + weight;
                    if (distance < (distances.get(neighbor) || Infinity)) {
                        distances.set(neighbor, distance);
                        pq.push([neighbor, distance]);
                    }
                }
            }
        }

        return distances;
    };

    test('should find shortest paths from start node', () => {
        fc.assert(
            fc.property(
                fc.dictionary(fc.string(), fc.array(fc.record({ neighbor: fc.integer({ min: 1, max: 20 }), weight: fc.integer({ min: 1, max: 100 }) }))),
                fc.integer({ min: 1, max: 20 }),
                (graph, startNode) => {
                    const intGraph: {
                        [k: string]: {
                            neighbor: number;
                            weight: number;
                        }[];
                    } = Object.fromEntries(Object.entries(graph).map(([key, value]) => [parseInt(key), value]));

                    const visit: jest.Mock<any, any, any> = jest.fn();
                    const options: WeightedGraphOptions<number> = { getNeighbors: getNeighbors(intGraph), getWeight: getWeight(intGraph), startNode, visit };
                    const distances: Map<number, number> = dijkstra(options);

                    const expectedDistances: Map<number, number> = dijkstraManual(intGraph, startNode);

                    expect(distances).toEqual(expectedDistances);
                }
            )
        );
    });

    test('should handle graph with no edges', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 20 }),
                (startNode) => {
                    const graph: { [key: number]: { neighbor: number, weight: number }[] } = {};
                    for (let i: number = 1; i <= 20; i++) {
                        graph[i] = [];
                    }
                    const visit: jest.Mock<any, any, any> = jest.fn();
                    const options: WeightedGraphOptions<number> = { getNeighbors: getNeighbors(graph), getWeight: getWeight(graph), startNode, visit };
                    const distances: Map<number, number> = dijkstra(options);

                    expect(distances.get(startNode)).toBe(0);
                    for (let i: number = 1; i <= 20; i++) {
                        if (i !== startNode) {
                            expect(distances.get(i)).toBeUndefined();
                        }
                    }
                }
            )
        );
    });

    test('should handle empty graph', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 20 }),
                (startNode) => {
                    const graph: { [key: number]: { neighbor: number, weight: number }[] } = {};
                    const visit: jest.Mock<any, any, any> = jest.fn();
                    const options: WeightedGraphOptions<number> = { getNeighbors: getNeighbors(graph), getWeight: getWeight(graph), startNode, visit };
                    const distances: Map<number, number> = dijkstra(options);
                    expect(distances.get(startNode)).toBe(0);
                }
            )
        );
    });
});
