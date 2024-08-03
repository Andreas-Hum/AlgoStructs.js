// AStar.test.ts
import { aStar } from '../../../src/Algorithms/Graph';
import { WeightedGraphOptions } from '../../../src/Options/AlgorithmOptions/GraphOptions/GraphOptions';
import * as fc from 'fast-check';

describe('aStar', () => {
    afterEach(() => {
        jest.clearAllTimers(); // Clear any timers after each test
    });

    const getNeighbors = (graph: { [key: number]: { neighbor: number, weight: number }[] }) => (node: number): number[] => (graph[node] || []).map(edge => edge.neighbor);

    const getWeight = (graph: { [key: number]: { neighbor: number, weight: number }[] }) => (node: number, neighbor: number): number => {
        return graph[node]?.find(edge => edge.neighbor === neighbor)?.weight || Infinity;
    };

    const heuristic = (node: number, target: number): number => Math.abs(node - target);

    const aStarManual = (graph: { [key: number]: { neighbor: number, weight: number }[] }, startNode: number, targetNode: number): number[] => {
        const openSet: Set<number> = new Set<number>([startNode]);
        const cameFrom: Map<number, number | null> = new Map<number, number | null>();

        const gScore: Map<number, number> = new Map<number, number>();
        const fScore: Map<number, number> = new Map<number, number>();
        gScore.set(startNode, 0);
        fScore.set(startNode, heuristic(startNode, targetNode));

        const pq: [number, number][] = [[startNode, fScore.get(startNode)!]];

        while (openSet.size > 0) {
            pq.sort((a, b) => a[1] - b[1]);
            const [current] = pq.shift()!;
            openSet.delete(current);

            if (current === targetNode) {
                const path: number[] = [];
                let temp: number | null = current;
                const visited: Set<number> = new Set<number>(); // Add a visited set to prevent infinite loops
                while (temp !== null) {
                    if (visited.has(temp)) {
                        throw new Error('Detected a circular reference in the path reconstruction.');
                    }
                    visited.add(temp);
                    path.unshift(temp);
                    temp = cameFrom.get(temp) ?? null;
                }
                return path;
            }

            const neighbors = graph[current] || [];
            for (const { neighbor, weight } of neighbors) {
                const tentativeGScore = gScore.get(current)! + weight;

                if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
                    if (!isCircularReference(neighbor, current, cameFrom)) {
                        cameFrom.set(neighbor, current);
                        gScore.set(neighbor, tentativeGScore);
                        fScore.set(neighbor, tentativeGScore + heuristic(neighbor, targetNode));

                        if (!openSet.has(neighbor)) {
                            openSet.add(neighbor);
                            pq.push([neighbor, fScore.get(neighbor)!]);
                        }
                    }
                }
            }
        }

        return [];
    };

    function isCircularReference(neighbor: number, current: number, cameFrom: Map<number, number | null>): boolean {
        let temp: number | null = current;
        while (temp !== null) {
            if (temp === neighbor) {
                return true;
            }
            temp = cameFrom.get(temp) ?? null;
        }
        return false;
    }

    test('should find shortest path from start node to target node', () => {
        fc.assert(
            fc.property(
                fc.dictionary(fc.integer().map(String), fc.array(fc.record({ neighbor: fc.integer({ min: 1, max: 20 }), weight: fc.integer({ min: 1, max: 100 }) }))),
                fc.integer({ min: 1, max: 20 }),
                fc.integer({ min: 1, max: 20 }),
                (graph, startNode, targetNode) => {
                    const intGraph: {
                        [k: number]: {
                            neighbor: number;
                            weight: number;
                        }[];
                    } = Object.fromEntries(Object.entries(graph).map(([key, value]) => [parseInt(key), value]));

                    const visit: jest.Mock<any, any> = jest.fn();
                    const options: WeightedGraphOptions<number> = { getNeighbors: getNeighbors(intGraph), getWeight: getWeight(intGraph), heuristic, startNode, targetNode, visit };
                    const path: number[] = aStar(options);

                    const expectedPath: number[] = aStarManual(intGraph, startNode, targetNode);

                    expect(path).toEqual(expectedPath);
                }
            )
        );
    });

    test('should handle graph with no edges', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 20 }),
                fc.integer({ min: 1, max: 20 }),
                (startNode, targetNode) => {
                    const graph: { [key: number]: { neighbor: number, weight: number }[] } = {};
                    for (let i: number = 1; i <= 20; i++) {
                        graph[i] = [];
                    }
                    const visit: jest.Mock<any, any> = jest.fn();
                    const options: WeightedGraphOptions<number> = { getNeighbors: getNeighbors(graph), getWeight: getWeight(graph), heuristic, startNode, targetNode, visit };
                    const path: number[] = aStar(options);

                    expect(path).toEqual(startNode === targetNode ? [startNode] : []);
                }
            )
        );
    });

    test('should handle empty graph', () => {
        fc.assert(
            fc.property(
                fc.integer({ min: 1, max: 20 }),
                fc.integer({ min: 1, max: 20 }),
                (startNode, targetNode) => {
                    const graph: { [key: number]: { neighbor: number, weight: number }[] } = {};
                    const visit: jest.Mock<any, any> = jest.fn();
                    const options: WeightedGraphOptions<number> = { getNeighbors: getNeighbors(graph), getWeight: getWeight(graph), heuristic, startNode, targetNode, visit };
                    const path: number[] = aStar(options);

                    expect(path).toEqual(startNode === targetNode ? [startNode] : []);
                }
            )
        );
    });
});
